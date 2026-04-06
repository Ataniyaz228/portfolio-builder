'use client';

import { useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Loader2, GripVertical } from 'lucide-react';
import ImageUpload from './ImageUpload';
import api from '@/lib/axios';

interface ProjectImage {
  id: string;
  image_url: string;
  order_index: number;
  flip_horizontal?: boolean;
  flip_vertical?: boolean;
  rotation_degrees?: number;
}

interface ProjectGalleryProps {
  projectId: string;
  images: ProjectImage[];
  onUpdate: () => void | Promise<void>;
}

export default function ProjectGallery({ projectId, images, onUpdate }: ProjectGalleryProps) {
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [orderedImages, setOrderedImages] = useState<ProjectImage[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [dragUnlockId, setDragUnlockId] = useState<string | null>(null);
  const [newImageFlipHorizontal, setNewImageFlipHorizontal] = useState(false);
  const [newImageFlipVertical, setNewImageFlipVertical] = useState(false);
  const [newImageRotationDegrees, setNewImageRotationDegrees] = useState(0);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setOrderedImages([...images].sort((a, b) => a.order_index - b.order_index));
  }, [images]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(pointer: coarse)');
    setIsTouchDevice(media.matches);
  }, []);

  const beginLongPress = (imageId: string) => {
    if (!isTouchDevice) return;
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);

    longPressTimerRef.current = setTimeout(() => {
      setDragUnlockId(imageId);
    }, 300);
  };

  const handleToggleImageFlip = async (
    image: ProjectImage,
    axis: 'horizontal' | 'vertical',
  ) => {
    const nextHorizontal = axis === 'horizontal'
      ? !image.flip_horizontal
      : !!image.flip_horizontal;
    const nextVertical = axis === 'vertical'
      ? !image.flip_vertical
      : !!image.flip_vertical;

    try {
      await api.patch(`/projects/images/${image.id}/transform`, {
        flip_horizontal: nextHorizontal,
        flip_vertical: nextVertical,
        rotation_degrees: image.rotation_degrees ?? 0,
      });
      await onUpdate();
    } catch (err) {
      console.error('Failed to update image flip:', err);
    }
  };

  const handleRotateImage = async (image: ProjectImage, direction: 'left' | 'right') => {
    const delta = direction === 'left' ? -90 : 90;
    const current = image.rotation_degrees ?? 0;
    const nextRotation = ((current + delta) % 360 + 360) % 360;

    try {
      await api.patch(`/projects/images/${image.id}/transform`, {
        flip_horizontal: image.flip_horizontal,
        flip_vertical: image.flip_vertical,
        rotation_degrees: nextRotation,
      });
      await onUpdate();
    } catch (err) {
      console.error('Failed to update image rotation:', err);
    }
  };

  const cancelLongPress = () => {
    if (!longPressTimerRef.current) return;
    clearTimeout(longPressTimerRef.current);
    longPressTimerRef.current = null;
  };

  const getImageTransformStyle = (
    flipHorizontal?: boolean,
    flipVertical?: boolean,
    rotationDegrees = 0,
  ) => {
    const transforms: string[] = [`rotate(${rotationDegrees}deg)`];
    if (flipHorizontal) transforms.push('scaleX(-1)');
    if (flipVertical) transforms.push('scaleY(-1)');
    return transforms.length ? { transform: transforms.join(' ') } : undefined;
  };

  const handleImageUpload = async (url: string) => {
    if (orderedImages.length >= 5) return;
    setUploading(true);
    try {
      await api.post(`/projects/${projectId}/images`, {
        image_url: url,
        flip_horizontal: newImageFlipHorizontal,
        flip_vertical: newImageFlipVertical,
        rotation_degrees: newImageRotationDegrees,
      });
      setNewImageFlipHorizontal(false);
      setNewImageFlipVertical(false);
      setNewImageRotationDegrees(0);
      await onUpdate();
    } catch (err) {
      console.error('Failed to add image:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (imageId: string) => {
    setDeletingId(imageId);
    try {
      await api.delete(`/projects/images/${imageId}`);
      await onUpdate();
    } catch (err) {
      console.error('Failed to delete image:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;

    const next = Array.from(orderedImages);
    const [moved] = next.splice(result.source.index, 1);
    next.splice(result.destination.index, 0, moved);

    const normalized = next.map((item, index) => ({ ...item, order_index: index }));
    setOrderedImages(normalized);

    try {
      await api.patch(`/projects/${projectId}/images/reorder`,
        normalized.map((item) => ({ id: item.id, order_index: item.order_index })),
      );
      await onUpdate();
    } catch (err) {
      console.error('Failed to reorder images:', err);
      setOrderedImages([...images].sort((a, b) => a.order_index - b.order_index));
    } finally {
      setDragUnlockId(null);
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold text-muted uppercase tracking-wide">
        Project Gallery ({orderedImages.length}/5)
      </label>

      {/* Existing Images */}
      {orderedImages.length > 0 && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="project-images" direction="horizontal">
            {(dropProvided) => (
              <div
                ref={dropProvided.innerRef}
                {...dropProvided.droppableProps}
                className="grid grid-cols-3 gap-2"
              >
                <AnimatePresence>
                  {orderedImages.map((img, i) => (
                    <Draggable
                      key={img.id}
                      draggableId={img.id}
                      index={i}
                      isDragDisabled={isTouchDevice && dragUnlockId !== img.id}
                    >
                      {(dragProvided, dragSnapshot) => (
                        <motion.div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          style={dragProvided.draggableProps.style}
                          className="relative aspect-video rounded-lg overflow-hidden border border-border group"
                        >
                          <div
                            className="w-full h-full"
                            style={getImageTransformStyle(
                              img.flip_horizontal,
                              img.flip_vertical,
                              img.rotation_degrees,
                            )}
                          >
                            <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 flex items-center justify-center">
                            <div className="grid grid-cols-3 gap-1 max-w-full">
                            <button
                              type="button"
                              onClick={() => handleToggleImageFlip(img, 'horizontal')}
                              className={`w-7 h-7 text-[10px] rounded text-white transition-colors ${
                                img.flip_horizontal ? 'bg-white/35' : 'bg-white/20 hover:bg-white/30'
                              }`}
                              title="Flip Horizontal"
                            >
                              H
                            </button>
                            <button
                              type="button"
                              onClick={() => handleToggleImageFlip(img, 'vertical')}
                              className={`w-7 h-7 text-[10px] rounded text-white transition-colors ${
                                img.flip_vertical ? 'bg-white/35' : 'bg-white/20 hover:bg-white/30'
                              }`}
                              title="Flip Vertical"
                            >
                              V
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRotateImage(img, 'left')}
                              className="w-7 h-7 text-[10px] rounded text-white bg-white/20 hover:bg-white/30 transition-colors"
                              title="Rotate Left"
                            >
                              L
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRotateImage(img, 'right')}
                              className="w-7 h-7 text-[10px] rounded text-white bg-white/20 hover:bg-white/30 transition-colors"
                              title="Rotate Right"
                            >
                              R
                            </button>
                            <div
                              {...dragProvided.dragHandleProps}
                              onTouchStart={() => beginLongPress(img.id)}
                              onTouchEnd={cancelLongPress}
                              onTouchCancel={cancelLongPress}
                              className={`w-7 h-7 rounded text-white flex items-center justify-center ${
                                isTouchDevice && dragUnlockId !== img.id
                                  ? 'bg-white/30'
                                  : 'bg-white/20 cursor-grab'
                              }`}
                              title="Drag"
                            >
                              <GripVertical className="w-4 h-4" />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDelete(img.id)}
                              disabled={deletingId === img.id}
                              className="w-7 h-7 bg-red-500/80 rounded text-white hover:bg-red-500 transition-colors flex items-center justify-center"
                              title="Delete"
                            >
                              {deletingId === img.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <X className="w-4 h-4" />
                              )}
                            </button>
                            </div>
                          </div>
                          <div className="absolute top-1 left-1 w-5 h-5 bg-foreground text-surface rounded-full flex items-center justify-center text-[10px] font-bold">
                            {i + 1}
                          </div>
                          {isTouchDevice && dragUnlockId !== img.id && (
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-white/85 bg-black/55 px-1.5 py-0.5 rounded">
                              Hold grip to drag
                            </div>
                          )}
                          {dragSnapshot.isDragging && (
                            <div className="absolute inset-0 ring-2 ring-foreground/40 pointer-events-none" />
                          )}
                        </motion.div>
                      )}
                    </Draggable>
                  ))}
                </AnimatePresence>
                {dropProvided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {/* Add Image Button */}
      {orderedImages.length < 5 && (
        <div className="space-y-2">
          <ImageUpload
            value=""
            onChange={handleImageUpload}
            label={uploading ? 'Uploading...' : 'Add Screenshot'}
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setNewImageFlipHorizontal((prev) => !prev)}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                newImageFlipHorizontal
                  ? 'border-foreground bg-foreground text-surface'
                  : 'border-border bg-background text-foreground hover:bg-surface-raised'
              }`}
            >
              Next image: Flip Horizontal
            </button>
            <button
              type="button"
              onClick={() => setNewImageFlipVertical((prev) => !prev)}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                newImageFlipVertical
                  ? 'border-foreground bg-foreground text-surface'
                  : 'border-border bg-background text-foreground hover:bg-surface-raised'
              }`}
            >
              Next image: Flip Vertical
            </button>
            <button
              type="button"
              onClick={() => setNewImageRotationDegrees((prev) => ((prev - 90) % 360 + 360) % 360)}
              className="px-3 py-1.5 text-xs rounded-lg border border-border bg-background text-foreground hover:bg-surface-raised transition-colors"
            >
              Next image: Rotate Left
            </button>
            <button
              type="button"
              onClick={() => setNewImageRotationDegrees((prev) => (prev + 90) % 360)}
              className="px-3 py-1.5 text-xs rounded-lg border border-border bg-background text-foreground hover:bg-surface-raised transition-colors"
            >
              Next image: Rotate Right
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
