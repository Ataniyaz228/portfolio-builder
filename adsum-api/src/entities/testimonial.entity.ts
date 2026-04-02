import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('testimonials')
export class Testimonial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  author_name: string;

  @Column({ nullable: true })
  author_role: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  avatar_url: string;

  @Column({ type: 'int', default: 0 })
  order_index: number;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.testimonials, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
