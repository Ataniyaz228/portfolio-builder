import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';

@Entity('profile_views')
@Index(['user_id', 'viewed_at'])
export class ProfileView {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  viewed_at: Date;

  @Column({ nullable: true, length: 64 })
  ip_hash: string;

  @Column({ nullable: true, length: 500 })
  referrer: string;

  @Column({ nullable: true, length: 500 })
  user_agent: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
