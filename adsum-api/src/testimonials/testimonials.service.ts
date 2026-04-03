import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Testimonial } from '../entities/testimonial.entity';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonial)
    private testimonialsRepository: Repository<Testimonial>,
  ) {}

  async findAll(userId: string) {
    return this.testimonialsRepository.find({
      where: { user_id: userId },
      order: { order_index: 'ASC', created_at: 'DESC' },
    });
  }

  async findOne(id: string, userId: string) {
    const testimonial = await this.testimonialsRepository.findOne({ where: { id, user_id: userId } });
    if (!testimonial) {
      throw new NotFoundException('Testimonial not found');
    }
    return testimonial;
  }

  async create(userId: string, data: Partial<Testimonial>) {
    const testimonial = this.testimonialsRepository.create({
      ...data,
      user_id: userId,
    });
    return this.testimonialsRepository.save(testimonial);
  }

  async update(id: string, userId: string, data: Partial<Testimonial>) {
    await this.findOne(id, userId); // verify ownership
    await this.testimonialsRepository.update(id, data);
    return this.findOne(id, userId);
  }

  async reorder(userId: string, items: { id: string; order_index: number }[]) {
    const promises = items.map(item =>
      this.testimonialsRepository.update({ id: item.id, user_id: userId }, { order_index: item.order_index })
    );
    await Promise.all(promises);
    return { success: true };
  }

  async remove(id: string, userId: string) {
    const testimonial = await this.findOne(id, userId);
    await this.testimonialsRepository.remove(testimonial);
    return { success: true };
  }
}
