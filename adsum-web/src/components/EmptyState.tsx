'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  illustration: 'inbox' | 'testimonials' | 'experience' | 'projects' | 'skills';
}

function InboxIllustration() {
  return (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
      <rect x="30" y="25" width="100" height="70" rx="8" className="fill-foreground/[0.03] stroke-border" strokeWidth="1.5" />
      <path d="M30 45L80 70L130 45" className="stroke-border" strokeWidth="1.5" strokeLinecap="round" />
      <motion.rect
        x="50" y="10" width="60" height="40" rx="6"
        className="fill-surface stroke-foreground/10"
        strokeWidth="1.5"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      />
      <motion.line x1="60" y1="22" x2="100" y2="22" className="stroke-foreground/10" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.4 }} />
      <motion.line x1="60" y1="30" x2="90" y2="30" className="stroke-foreground/[0.06]" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.4 }} />
      <motion.line x1="60" y1="38" x2="95" y2="38" className="stroke-foreground/[0.06]" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.4 }} />
      <motion.circle cx="135" cy="20" r="8" className="fill-blue-500/10 stroke-blue-500/30" strokeWidth="1"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8, type: 'spring' }} />
      <motion.path d="M132 20L134 22L138 18" className="stroke-blue-500/50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 0.3 }} />
    </svg>
  );
}

function TestimonialsIllustration() {
  return (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
      <motion.rect x="15" y="30" width="75" height="50" rx="12" className="fill-foreground/[0.03] stroke-border" strokeWidth="1.5"
        initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }} />
      <motion.circle cx="35" cy="50" r="8" className="fill-foreground/[0.06]"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }} />
      <motion.line x1="50" y1="47" x2="78" y2="47" className="stroke-foreground/10" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 0.3 }} />
      <motion.line x1="50" y1="55" x2="70" y2="55" className="stroke-foreground/[0.06]" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.3 }} />
      <motion.line x1="25" y1="68" x2="80" y2="68" className="stroke-foreground/[0.04]" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.3 }} />

      <motion.rect x="70" y="40" width="75" height="50" rx="12" className="fill-foreground/[0.03] stroke-border" strokeWidth="1.5"
        initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} />
      <motion.circle cx="90" cy="60" r="8" className="fill-violet-500/10"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }} />
      <motion.line x1="105" y1="57" x2="133" y2="57" className="stroke-foreground/10" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.3 }} />
      <motion.line x1="105" y1="65" x2="125" y2="65" className="stroke-foreground/[0.06]" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.3 }} />
      <motion.line x1="80" y1="78" x2="135" y2="78" className="stroke-foreground/[0.04]" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8, duration: 0.3 }} />

      <motion.text x="22" y="42" className="fill-foreground/10" fontSize="18" fontWeight="bold"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>"</motion.text>
      <motion.text x="77" y="52" className="fill-violet-500/20" fontSize="18" fontWeight="bold"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>"</motion.text>
    </svg>
  );
}

function ExperienceIllustration() {
  return (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
      {/* Timeline line */}
      <motion.line x1="40" y1="15" x2="40" y2="105" className="stroke-border" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />

      {/* Card 1 */}
      <motion.circle cx="40" cy="30" r="5" className="fill-emerald-500/20 stroke-emerald-500/50" strokeWidth="1.5"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }} />
      <motion.rect x="55" y="18" width="85" height="24" rx="8" className="fill-foreground/[0.03] stroke-border" strokeWidth="1"
        initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.4 }} />
      <motion.line x1="63" y1="27" x2="95" y2="27" className="stroke-foreground/10" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.3 }} />
      <motion.line x1="63" y1="35" x2="130" y2="35" className="stroke-foreground/[0.05]" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.3 }} />

      {/* Card 2 */}
      <motion.circle cx="40" cy="60" r="5" className="fill-blue-500/20 stroke-blue-500/50" strokeWidth="1.5"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }} />
      <motion.rect x="55" y="48" width="85" height="24" rx="8" className="fill-foreground/[0.03] stroke-border" strokeWidth="1"
        initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.4 }} />
      <motion.line x1="63" y1="57" x2="105" y2="57" className="stroke-foreground/10" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8, duration: 0.3 }} />
      <motion.line x1="63" y1="65" x2="125" y2="65" className="stroke-foreground/[0.05]" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 0.3 }} />

      {/* Card 3 - dashed/empty */}
      <motion.circle cx="40" cy="90" r="5" className="fill-foreground/[0.05] stroke-border" strokeWidth="1.5" strokeDasharray="3 3"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7, type: 'spring' }} />
      <motion.rect x="55" y="78" width="85" height="24" rx="8" className="stroke-border" strokeWidth="1" strokeDasharray="4 4" fill="none"
        initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 0.9, duration: 0.4 }} />
    </svg>
  );
}

function ProjectsIllustration() {
  return (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
      <motion.rect x="10" y="20" width="60" height="45" rx="8" className="fill-foreground/[0.03] stroke-border" strokeWidth="1.5"
        initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} />
      <motion.rect x="15" y="25" width="50" height="20" rx="4" className="fill-violet-500/[0.06]"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.4 }} />
      <motion.line x1="15" y1="52" x2="55" y2="52" className="stroke-foreground/10" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.3 }} />
      <motion.line x1="15" y1="59" x2="40" y2="59" className="stroke-foreground/[0.06]" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.3 }} />

      <motion.rect x="90" y="30" width="60" height="45" rx="8" className="fill-foreground/[0.03] stroke-border" strokeWidth="1.5"
        initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} />
      <motion.rect x="95" y="35" width="50" height="20" rx="4" className="fill-blue-500/[0.06]"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.4 }} />
      <motion.line x1="95" y1="62" x2="135" y2="62" className="stroke-foreground/10" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.3 }} />
      <motion.line x1="95" y1="69" x2="120" y2="69" className="stroke-foreground/[0.06]" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8, duration: 0.3 }} />

      {/* Dashed add card */}
      <motion.rect x="50" y="55" width="60" height="45" rx="8" className="stroke-border" strokeWidth="1.5" strokeDasharray="5 5" fill="none"
        initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 0.6, duration: 0.4 }} />
      <motion.line x1="75" y1="70" x2="85" y2="70" className="stroke-foreground/10" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 0.3 }} />
      <motion.line x1="80" y1="65" x2="80" y2="75" className="stroke-foreground/10" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 0.3 }} />
    </svg>
  );
}

function SkillsIllustration() {
  return (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
      {[
        { x: 20, y: 30, w: 45, color: 'fill-violet-500/[0.08]', delay: 0 },
        { x: 70, y: 25, w: 35, color: 'fill-blue-500/[0.08]', delay: 0.1 },
        { x: 110, y: 30, w: 40, color: 'fill-emerald-500/[0.08]', delay: 0.2 },
        { x: 30, y: 55, w: 50, color: 'fill-amber-500/[0.08]', delay: 0.3 },
        { x: 85, y: 55, w: 40, color: 'fill-rose-500/[0.08]', delay: 0.4 },
        { x: 45, y: 80, w: 35, color: 'fill-blue-500/[0.06]', delay: 0.5 },
        { x: 85, y: 80, w: 45, color: 'fill-foreground/[0.04]', delay: 0.6 },
      ].map((tag, i) => (
        <motion.rect key={i} x={tag.x} y={tag.y} width={tag.w} height="20" rx="10"
          className={`${tag.color} stroke-border`} strokeWidth="0.5"
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 + tag.delay, type: 'spring', stiffness: 200 }}
        />
      ))}
    </svg>
  );
}

const illustrations = {
  inbox: InboxIllustration,
  testimonials: TestimonialsIllustration,
  experience: ExperienceIllustration,
  projects: ProjectsIllustration,
  skills: SkillsIllustration,
};

export default function EmptyState({ icon, title, description, action, illustration }: EmptyStateProps) {
  const Illustration = illustrations[illustration];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-12 text-center"
    >
      <Illustration />
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-1.5">{title}</h3>
        <p className="text-sm text-muted max-w-xs mx-auto">{description}</p>
      </div>
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
}
