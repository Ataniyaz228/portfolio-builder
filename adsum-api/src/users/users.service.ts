import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { ProfileView } from '../entities/profile-view.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(ProfileView)
    private profileViewsRepository: Repository<ProfileView>,
  ) {}

  async findByUsername(username: string) {
    return this.usersRepository.findOne({
      where: { username },
    });
  }

  async findByUsernameWithRelations(username: string) {
    const user = await this.usersRepository.findOne({
      where: { username },
      relations: ['projects', 'projects.images', 'skills', 'experiences', 'testimonials'],
    });

    if (user) {
      // Increment profile views
      await this.usersRepository.increment({ id: user.id }, 'profile_views', 1);
      // Log daily view
      await this.logDailyView(user.id);
    }

    return user;
  }

  async getUserStats(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: ['profile_views'],
    });

    const projectsCount = await this.usersRepository.manager.count('Project', { where: { user_id: userId } });
    const skillsCount = await this.usersRepository.manager.count('Skill', { where: { user_id: userId } });
    const experiencesCount = await this.usersRepository.manager.count('Experience', { where: { user_id: userId } });

    return {
      views: user?.profile_views || 0,
      projects: projectsCount,
      skills: skillsCount,
      experiences: experiencesCount,
    };
  }

  async findAllPublic() {
    return this.usersRepository.find({
      select: ['id', 'username', 'full_name', 'updated_at'],
      order: { created_at: 'DESC' },
    });
  }

  async findById(id: string) {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async create(data: Partial<User>) {
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  async update(id: string, data: Partial<User>) {
    await this.usersRepository.update(id, data);
    return this.findById(id);
  }

  private async logDailyView(userId: string, ipHash?: string, referrer?: string, userAgent?: string) {
    await this.profileViewsRepository.save({
      user_id: userId,
      viewed_at: new Date(),
      ip_hash: ipHash,
      referrer: referrer,
      user_agent: userAgent,
    });
  }

  async getViewsAnalytics(userId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const views = await this.profileViewsRepository
      .createQueryBuilder('pv')
      .select('DATE(pv.viewed_at)', 'date')
      .addSelect('COUNT(*)', 'views')
      .where('pv.user_id = :userId', { userId })
      .andWhere('pv.viewed_at >= :startDate', { startDate })
      .groupBy('DATE(pv.viewed_at)')
      .orderBy('DATE(pv.viewed_at)', 'ASC')
      .getRawMany();

    // Fill in missing dates with 0 views
    const result: { date: string; views: number }[] = [];
    const now = new Date();
    for (let d = new Date(startDate); d <= now; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const found = views.find((v: any) => v.date === dateStr);
      result.push({ date: dateStr, views: found ? Number(found.views) : 0 });
    }

    const totalViews = result.reduce((sum, r) => sum + r.views, 0);

    return { period: days, data: result, total: totalViews };
  }

  async getAnalyticsStats(userId: string) {
    const totalViews = await this.profileViewsRepository.count({ where: { user_id: userId } });
    
    const uniqueVisitors = await this.profileViewsRepository
      .createQueryBuilder('pv')
      .select('COUNT(DISTINCT pv.ip_hash)', 'count')
      .where('pv.user_id = :userId', { userId })
      .getRawOne();

    const topReferrers = await this.profileViewsRepository
      .createQueryBuilder('pv')
      .select('pv.referrer', 'referrer')
      .addSelect('COUNT(*)', 'count')
      .where('pv.user_id = :userId', { userId })
      .andWhere('pv.referrer IS NOT NULL')
      .groupBy('pv.referrer')
      .orderBy('count', 'DESC')
      .limit(5)
      .getRawMany();

    return {
      totalViews,
      uniqueVisitors: Number(uniqueVisitors?.count || 0),
      topReferrers: topReferrers.map((r: any) => ({ source: r.referrer, count: Number(r.count) })),
    };
  }
}

