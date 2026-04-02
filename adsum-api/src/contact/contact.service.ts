import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactMessage } from '../entities/contact-message.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactMessage)
    private contactsRepository: Repository<ContactMessage>
  ) {}

  async findAllByUserId(userId: string) {
    return this.contactsRepository.find({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string, userId: string) {
    const message = await this.contactsRepository.findOne({
      where: { id, user_id: userId },
    });
    if (!message) throw new NotFoundException('Message not found');
    return message;
  }

  async create(userId: string, data: any) {
    const message = this.contactsRepository.create({
      ...data,
      user_id: userId,
      is_read: false,
    });
    return this.contactsRepository.save(message);
  }

  async markAsRead(id: string, userId: string) {
    await this.findOne(id, userId);
    await this.contactsRepository.update({ id }, { is_read: true });
    return this.findOne(id, userId);
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    await this.contactsRepository.delete({ id });
    return { deleted: true };
  }
}
