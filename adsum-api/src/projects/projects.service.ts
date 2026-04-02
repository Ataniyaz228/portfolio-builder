import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { ProjectImage } from '../entities/project-image.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(ProjectImage)
    private projectImagesRepository: Repository<ProjectImage>,
  ) {}

  async findAll(userId: string) {
    return this.projectsRepository.find({
      where: { user_id: userId },
      order: { order_index: 'ASC', created_at: 'DESC' },
      relations: ['images'],
    });
  }

  async findOne(id: string, userId: string) {
    const project = await this.projectsRepository.findOne({
      where: { id, user_id: userId },
      relations: ['images'],
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async create(userId: string, data: any) {
    const project = this.projectsRepository.create({
      ...data,
      user_id: userId,
    });
    return this.projectsRepository.save(project);
  }

  async update(id: string, userId: string, data: any) {
    await this.findOne(id, userId); // Ensure exists and owned
    await this.projectsRepository.update({ id }, data);
    return this.findOne(id, userId);
  }

  async remove(id: string, userId: string) {
    const project = await this.findOne(id, userId);
    await this.projectsRepository.remove(project);
    return { success: true };
  }

  async addImage(projectId: string, userId: string, imageUrl: string) {
    const project = await this.findOne(projectId, userId);
    const count = await this.projectImagesRepository.count({ where: { project_id: projectId } });
    if (count >= 5) throw new NotFoundException('Maximum 5 images allowed');
    
    const image = this.projectImagesRepository.create({
      project_id: projectId,
      image_url: imageUrl,
      order_index: count,
    });
    return this.projectImagesRepository.save(image);
  }

  async removeImage(imageId: string, userId: string) {
    const image = await this.projectImagesRepository.findOne({
      where: { id: imageId },
      relations: ['project'],
    });
    if (!image || image.project.user_id !== userId) {
      throw new NotFoundException('Image not found');
    }
    await this.projectImagesRepository.remove(image);
    return { success: true };
  }

  async reorderImages(projectId: string, userId: string, items: { id: string; order_index: number }[]) {
    const project = await this.findOne(projectId, userId);
    for (const item of items) {
      await this.projectImagesRepository.update(
        { id: item.id, project_id: projectId },
        { order_index: item.order_index }
      );
    }
    return { success: true };
  }

  async reorder(userId: string, items: { id: string; order_index: number }[]) {
    // Basic bulk update
    for (const item of items) {
      await this.projectsRepository.update(
        { id: item.id, user_id: userId },
        { order_index: item.order_index }
      );
    }
    return { success: true };
  }
}
