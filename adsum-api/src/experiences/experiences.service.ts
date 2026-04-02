import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from '../entities/experience.entity';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(Experience)
    private experiencesRepository: Repository<Experience>
  ) {}

  async findAll(userId: string) {
    return this.experiencesRepository.find({
      where: { user_id: userId },
      order: { order_index: 'ASC', created_at: 'DESC' },
    });
  }

  async findOne(id: string, userId: string) {
    const experience = await this.experiencesRepository.findOne({
      where: { id, user_id: userId },
    });
    if (!experience) throw new NotFoundException('Experience not found');
    return experience;
  }

  async create(userId: string, data: any) {
    const experience = this.experiencesRepository.create({
      ...data,
      start_date: new Date(data.start_date),
      end_date: data.end_date ? new Date(data.end_date) : null,
      user_id: userId,
    });
    return this.experiencesRepository.save(experience);
  }

  async update(id: string, userId: string, data: any) {
    await this.findOne(id, userId);
    
    // Convert dates if present
    const payload = { ...data };
    if (payload.start_date) payload.start_date = new Date(payload.start_date);
    if (payload.end_date) payload.end_date = new Date(payload.end_date);
    if (payload.is_current === true) payload.end_date = null;

    await this.experiencesRepository.update({ id }, payload);
    return this.findOne(id, userId);
  }

  async remove(id: string, userId: string) {
    const experience = await this.findOne(id, userId);
    await this.experiencesRepository.remove(experience);
    return { success: true };
  }

  async reorder(userId: string, items: { id: string; order_index: number }[]) {
    // Basic bulk update
    for (const item of items) {
      await this.experiencesRepository.update(
        { id: item.id, user_id: userId },
        { order_index: item.order_index }
      );
    }
    return { success: true };
  }
}
