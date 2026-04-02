import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  Query,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.usersService.findAllPublic();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req: any) {
    const user = await this.usersService.findById(req.user.sub);
    if (!user) throw new NotFoundException('User not found');
    const { password_hash: _, ...profile } = user;
    return profile;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/stats')
  async getStats(@Request() req: any) {
    return this.usersService.getUserStats(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateProfile(@Request() req: any, @Body() updateData: any) {
    // Only allow updating safe fields
    const allowedFields = [
      'full_name',
      'bio',
      'avatar_url',
      'github_url',
      'linkedin_url',
      'twitter_url',
      'theme_color',
      'template_id',
    ];
    const safeData: any = {};
    for (const field of allowedFields) {
      if (updateData[field] !== undefined) {
        safeData[field] = updateData[field];
      }
    }
    const updated = await this.usersService.update(req.user.sub, safeData);
    if (!updated) throw new NotFoundException('User not found');
    const { password_hash: _, ...profile } = updated;
    return profile;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/analytics')
  async getAnalytics(@Request() req: any, @Query('days') days?: string) {
    const period = days ? parseInt(days, 10) : 30;
    return this.usersService.getViewsAnalytics(req.user.sub, period);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/analytics/stats')
  async getAnalyticsStats(@Request() req: any) {
    return this.usersService.getAnalyticsStats(req.user.sub);
  }

  @Get(':username')
  async getPublicProfile(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException('User profile not found');
    }
    const { password_hash: _, ...publicProfile } = user;
    return publicProfile;
  }

  @Get(':username/full')
  async getFullPublicProfile(@Param('username') username: string) {
    const user = await this.usersService.findByUsernameWithRelations(username);
    if (!user) {
      throw new NotFoundException('User profile not found');
    }
    const { password_hash: _, ...publicProfile } = user;
    return publicProfile;
  }
}
