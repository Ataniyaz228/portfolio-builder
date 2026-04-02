import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Project } from './project.entity';
import { Skill } from './skill.entity';
import { Experience } from './experience.entity';
import { Testimonial } from './testimonial.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column({ nullable: true })
  full_name: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ nullable: true })
  avatar_url: string;

  @Column({ nullable: true })
  github_url: string;

  @Column({ nullable: true })
  linkedin_url: string;

  @Column({ nullable: true })
  twitter_url: string;

  @Column({ type: 'int', default: 0 })
  profile_views: number;

  @Column({ default: 'blue' })
  theme_color: string;

  @Column({ default: 'creative' })
  template_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @OneToMany(() => Skill, (skill) => skill.user)
  skills: Skill[];

  @OneToMany(() => Experience, (exp) => exp.user)
  experiences: Experience[];

  @OneToMany(() => Testimonial, (testimonial) => testimonial.user)
  testimonials: Testimonial[];
}
