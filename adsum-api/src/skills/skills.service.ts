import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Skill } from '../entities/skill.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillsRepository: Repository<Skill>
  ) {}

  async findAll(userId: string) {
    return this.skillsRepository.find({
      where: { user_id: userId },
      order: { order_index: 'ASC', created_at: 'DESC' },
    });
  }

  async findOne(id: string, userId: string) {
    const skill = await this.skillsRepository.findOne({
      where: { id, user_id: userId },
    });
    if (!skill) throw new NotFoundException('Skill not found');
    return skill;
  }

  async create(userId: string, data: any) {
    try {
      const skill = this.skillsRepository.create({
        ...data,
        user_id: userId,
      });
      return await this.skillsRepository.save(skill);
    } catch (error) {
       // TypeORM throws QueryFailedError for constraint violations like unique constraints (23505 in postgres)
       if (error instanceof QueryFailedError && error.driverError?.code === '23505') {
         throw new ConflictException('Skill with this name already exists for this user.');
       }
       throw error;
    }
  }

  async update(id: string, userId: string, data: any) {
    await this.findOne(id, userId);
    try {
      await this.skillsRepository.update({ id }, data);
      return this.findOne(id, userId);
    } catch (error) {
       if (error instanceof QueryFailedError && error.driverError?.code === '23505') {
         throw new ConflictException('Skill with this name already exists for this user.');
       }
       throw error;
    }
  }

  async remove(id: string, userId: string) {
    const skill = await this.findOne(id, userId);
    await this.skillsRepository.remove(skill);
    return { success: true };
  }

  async reorder(userId: string, items: { id: string; order_index: number }[]) {
    // Basic bulk update
    for (const item of items) {
      await this.skillsRepository.update(
        { id: item.id, user_id: userId },
        { order_index: item.order_index }
      );
    }
    return { success: true };
  }
}
