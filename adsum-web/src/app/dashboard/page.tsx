'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye, Briefcase, Star, Activity, ArrowRight, Loader2,
  ExternalLink, CheckCircle2, Circle, Clock, Zap,
  GripVertical, Plus, X, ListTodo
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import Link from 'next/link';
import api from '@/lib/axios';
import ViewsChart from '@/components/ViewsChart';
import { WebGLShader } from '@/components/ui/web-gl-shader';
import { MetalButton } from '@/components/ui/liquid-glass-button';

/* ═══════════════════════════════════════════
   Animated Counter Hook
   ═══════════════════════════════════════════ */
function useAnimatedCounter(target: number, duration = 1200, enabled = true) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!enabled || target === 0) {
      const id = requestAnimationFrame(() => setCount(target));
      return () => cancelAnimationFrame(id);
    }
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [target, duration, enabled]);

  return count;
}

/* ═══════════════════════════════════════════
   3D Tilt Card (monochrome)
   ═══════════════════════════════════════════ */
function TiltCard({ children, className = '' }: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`cursor-default hover:glow-mono ${className}`}
      style={{ transition: 'transform 0.35s cubic-bezier(0.03, 0.98, 0.52, 0.99), box-shadow 0.35s ease' }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Stat Counter Display
   ═══════════════════════════════════════════ */
function StatValue({ value, loading: isLoading }: { value: number; loading: boolean }) {
  const animated = useAnimatedCounter(value, 1400, !isLoading);
  if (isLoading) return <Loader2 className="w-6 h-6 animate-spin text-foreground/20" />;
  return <>{animated}</>;
}

/* ═══════════════════════════════════════════
   Task Board Types & Helpers
   ═══════════════════════════════════════════ */
interface Task {
  id: string;
  text: string;
}

interface TaskColumns {
  todo: Task[];
  done: Task[];
}

const STORAGE_KEY = 'adsum-dashboard-tasks';

function loadTasks(): TaskColumns {
  if (typeof window === 'undefined') return { todo: [], done: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { todo: [], done: [] };
}

function saveTasks(cols: TaskColumns) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cols)); } catch { /* ignore */ }
}

function getDefaultTasks(data: { projects: number; skills: number; experiences: number }): TaskColumns {
  const todo: Task[] = [];
  if (data.projects === 0) todo.push({ id: 'def-1', text: 'Add your first project' });
  if (data.skills === 0) todo.push({ id: 'def-2', text: 'Publish your skills' });
  if (data.experiences === 0) todo.push({ id: 'def-3', text: 'Add work experience' });
  if (todo.length === 0) todo.push({ id: 'def-4', text: 'Add a new project showcase' });
  const done: Task[] = [];
  if (data.projects > 0) done.push({ id: 'def-done-1', text: 'Add your first project' });
  if (data.skills > 0) done.push({ id: 'def-done-2', text: 'Publish your skills' });
  if (data.experiences > 0) done.push({ id: 'def-done-3', text: 'Add work experience' });
  return { todo, done };
}

/* ═══════════════════════════════════════════
   Main Dashboard
   ═══════════════════════════════════════════ */
export default function DashboardOverview() {
  const { user } = useAuthStore();
  const [data, setData] = useState({ views: 0, projects: 0, skills: 0, experiences: 0 });
  const [loading, setLoading] = useState(true);
  const profileUser = user as { username?: string; full_name?: string } | null;

  /* Task board state */
  const [columns, setColumns] = useState<TaskColumns>({ todo: [], done: [] });
  const [tasksInitialized, setTasksInitialized] = useState(false);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    api.get('/users/me/stats')
      .then(res => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  /* Initialize tasks from localStorage or defaults */
  useEffect(() => {
    if (loading || tasksInitialized) return;
    const saved = loadTasks();
    const id = requestAnimationFrame(() => {
      if (saved.todo.length > 0 || saved.done.length > 0) {
        setColumns(saved);
      } else {
        setColumns(getDefaultTasks(data));
      }
      setTasksInitialized(true);
    });
    return () => cancelAnimationFrame(id);
  }, [loading, tasksInitialized, data]);

  /* Persist on change */
  useEffect(() => {
    if (tasksInitialized) saveTasks(columns);
  }, [columns, tasksInitialized]);

  const username = profileUser?.username || '';
  const fullName = profileUser?.full_name || username;
  const firstName = fullName?.split(' ')[0] || username;

  const stats = [
    { label: 'Views', value: data.views, icon: Eye },
    { label: 'Projects', value: data.projects, icon: Briefcase },
    { label: 'Skills', value: data.skills, icon: Star },
    { label: 'Experience', value: data.experiences, icon: Activity },
  ];

  const quickActions = [
    { label: 'Add a project', desc: 'Showcase your work', href: '/dashboard/projects', icon: Briefcase },
    { label: 'Update skills', desc: 'Keep your stack current', href: '/dashboard/skills', icon: Star },
    { label: 'Add experience', desc: 'Share your journey', href: '/dashboard/experience', icon: Clock },
  ];

  /* ── Drag & Drop ── */
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    const srcCol = source.droppableId as keyof TaskColumns;
    const dstCol = destination.droppableId as keyof TaskColumns;
    if (srcCol === dstCol) {
      const items = [...columns[srcCol]];
      const [moved] = items.splice(source.index, 1);
      items.splice(destination.index, 0, moved);
      setColumns(prev => ({ ...prev, [srcCol]: items }));
    } else {
      const srcItems = [...columns[srcCol]];
      const dstItems = [...columns[dstCol]];
      const [moved] = srcItems.splice(source.index, 1);
      dstItems.splice(destination.index, 0, moved);
      setColumns(prev => ({ ...prev, [srcCol]: srcItems, [dstCol]: dstItems }));
    }
  };

  const addTask = () => {
    const text = newTask.trim();
    if (!text) return;
    setColumns(prev => ({ ...prev, todo: [...prev.todo, { id: `task-${Date.now()}`, text }] }));
    setNewTask('');
  };

  const removeTask = (colKey: keyof TaskColumns, taskId: string) => {
    setColumns(prev => ({ ...prev, [colKey]: prev[colKey].filter(t => t.id !== taskId) }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ═══ Bento Grid ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

        {/* ── Hero Banner ── col-span-3 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-3 relative overflow-hidden rounded-2xl p-7 min-h-[160px]"
        >
          {/* WebGL Shader Background */}
          <WebGLShader className="absolute inset-0 w-full h-full block rounded-2xl" />
          <div className="absolute inset-0 bg-black/40 rounded-2xl" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse-dot" />
                <span className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.2em]">Dashboard</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-1.5">
                Welcome back, {firstName}
              </h1>
              <p className="text-white/30 text-xs flex items-center gap-2.5 font-medium">
                <span>{data.views} views</span>
                <span className="w-1 h-1 rounded-full bg-white/15" />
                <span>{data.projects} projects</span>
                <span className="w-1 h-1 rounded-full bg-white/15" />
                <span>{data.skills} skills</span>
              </p>
            </div>

            <motion.a
              href={`/u/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white/80 font-semibold text-xs border border-white/10 hover:bg-white/15 hover:text-white transition-all shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Portfolio
            </motion.a>
          </div>
        </motion.div>

        {/* ── Setup Progress ── col-span-1 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5 }}
          className="lg:col-span-1 glass-frost rounded-2xl p-5 flex flex-col"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.15em]">Progress</span>
            <span className="text-[10px] font-bold text-foreground/60 tabular-nums">
              {loading ? '...' : `${Math.round((stats.filter((_, i) => [data.projects, data.skills, data.experiences][i > 0 ? i - 1 : 0] > 0).length / 3) * 100)}%`}
            </span>
          </div>

          <div className="h-1.5 rounded-full bg-foreground/[0.06] overflow-hidden mb-4">
            <motion.div
              className="h-full rounded-full bg-foreground/70"
              initial={{ width: 0 }}
              animate={{ width: `${((data.projects > 0 ? 1 : 0) + (data.skills > 0 ? 1 : 0) + (data.experiences > 0 ? 1 : 0)) / 3 * 100}%` }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="space-y-1.5 flex-1">
            {[
              { label: 'Projects', done: data.projects > 0, href: '/dashboard/projects' },
              { label: 'Skills', done: data.skills > 0, href: '/dashboard/skills' },
              { label: 'Experience', done: data.experiences > 0, href: '/dashboard/experience' },
            ].map((step) => (
              <Link
                key={step.label}
                href={step.href}
                className="flex items-center gap-2 py-1.5 rounded-lg hover:bg-foreground/[0.03] transition-colors group"
              >
                {step.done ? (
                  <CheckCircle2 className="w-4 h-4 text-foreground/50 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-foreground/15 group-hover:text-foreground/30 shrink-0 transition-colors" />
                )}
                <span className={`text-xs font-medium ${step.done ? 'text-foreground/35 line-through' : 'text-foreground/70'}`}>
                  {step.label}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* ── Stat Cards ── 4 × col-span-1 */}
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <TiltCard className="glass-frost rounded-2xl p-5 h-full">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-foreground/[0.05] flex items-center justify-center">
                  <stat.icon className="w-[18px] h-[18px] text-foreground/50" />
                </div>
                <GripVertical className="w-3.5 h-3.5 text-foreground/10" />
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight text-foreground tabular-nums mb-0.5">
                <StatValue value={stat.value} loading={loading} />
              </h3>
              <p className="text-[10px] font-semibold text-foreground/35 uppercase tracking-[0.12em]">{stat.label}</p>
            </TiltCard>
          </motion.div>
        ))}

        {/* ── Views Chart ── col-span-2 */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="lg:col-span-2"
        >
          <ViewsChart />
        </motion.div>

        {/* ── Task Board ── col-span-2 */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="lg:col-span-2 glass-frost rounded-2xl p-5 flex flex-col"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-foreground/[0.06] flex items-center justify-center">
                <ListTodo className="w-3.5 h-3.5 text-foreground/50" />
              </div>
              <span className="text-xs font-bold text-foreground/80">Tasks</span>
            </div>
            <span className="text-[10px] font-bold text-foreground/30 tabular-nums">
              {columns.done.length}/{columns.todo.length + columns.done.length}
            </span>
          </div>

          {/* Add task input */}
          <div className="flex gap-2 mb-4">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              placeholder="Add a task..."
              className="flex-1 px-3 py-2 rounded-xl bg-foreground/[0.03] border border-foreground/[0.06] text-xs text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-foreground/15 transition-colors"
            />
            <button
              onClick={addTask}
              className="w-8 h-8 rounded-xl bg-foreground/[0.06] flex items-center justify-center text-foreground/40 hover:text-foreground/70 hover:bg-foreground/[0.1] transition-colors shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* DnD Columns */}
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
              {(['todo', 'done'] as const).map((colKey) => (
                <Droppable key={colKey} droppableId={colKey}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`rounded-xl p-2 transition-colors min-h-[120px] ${
                        snapshot.isDraggingOver ? 'drop-zone-active bg-foreground/[0.03]' : 'bg-foreground/[0.015]'
                      }`}
                    >
                      <div className="text-[9px] font-bold text-foreground/25 uppercase tracking-[0.15em] px-1 mb-2">
                        {colKey === 'todo' ? 'To Do' : 'Done'}
                      </div>

                      <div className="space-y-1.5">
                        <AnimatePresence>
                          {columns[colKey].map((task, idx) => (
                            <Draggable key={task.id} draggableId={task.id} index={idx}>
                              {(dragProvided, dragSnapshot) => (
                                <div
                                  ref={dragProvided.innerRef}
                                  {...dragProvided.draggableProps}
                                  style={{
                                    ...dragProvided.draggableProps.style,
                                    ...(dragSnapshot.isDragging ? { opacity: 0.85 } : {}),
                                  }}
                                  className={`group flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-white border transition-all ${
                                    dragSnapshot.isDragging
                                      ? 'border-foreground/15 drag-shadow scale-[1.02] rotate-[0.5deg]'
                                      : 'border-foreground/[0.06] hover:border-foreground/10'
                                  }`}
                                >
                                  <div
                                    {...dragProvided.dragHandleProps}
                                    className="shrink-0 cursor-grab active:cursor-grabbing text-foreground/15 hover:text-foreground/30 transition-colors"
                                  >
                                    <GripVertical className="w-3 h-3" />
                                  </div>
                                  <span className={`text-[11px] font-medium flex-1 min-w-0 truncate ${
                                    colKey === 'done' ? 'text-foreground/35 line-through' : 'text-foreground/70'
                                  }`}>
                                    {task.text}
                                  </span>
                                  <button
                                    onClick={() => removeTask(colKey, task.id)}
                                    className="shrink-0 w-4 h-4 flex items-center justify-center rounded text-foreground/0 group-hover:text-foreground/25 hover:!text-foreground/50 transition-colors"
                                  >
                                    <X className="w-2.5 h-2.5" />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </AnimatePresence>
                        {provided.placeholder}
                      </div>

                      {columns[colKey].length === 0 && !snapshot.isDraggingOver && (
                        <div className="drop-zone h-12 flex items-center justify-center mt-1">
                          <span className="text-[10px] text-foreground/20">
                            {colKey === 'todo' ? 'No tasks' : 'Drop here'}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        </motion.div>

        {/* ── Quick Actions ── col-span-4 (full width) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.45 }}
          className="lg:col-span-4 glass-frost rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-foreground/[0.06] flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-foreground/50" />
            </div>
            <span className="text-xs font-bold text-foreground/80">Quick Actions</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-foreground/[0.04] hover:border-foreground/10 hover:bg-foreground/[0.02] transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-foreground/[0.05] flex items-center justify-center shrink-0 group-hover:bg-foreground/[0.08] transition-colors">
                  <action.icon className="w-4 h-4 text-foreground/45" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground/75">{action.label}</p>
                  <p className="text-[10px] text-foreground/30">{action.desc}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-foreground/0 group-hover:text-foreground/30 transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
