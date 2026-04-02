import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Post()
  create(@Req() req: any, @Body() createData: any) {
    return this.experiencesService.create(req.user.sub, createData);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.experiencesService.findAll(req.user.sub);
  }

  @Patch('reorder')
  reorder(@Req() req: any, @Body() items: { id: string; order_index: number }[]) {
    return this.experiencesService.reorder(req.user.sub, items);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.experiencesService.findOne(id, req.user.sub);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Req() req: any, @Body() updateData: any) {
    return this.experiencesService.update(id, req.user.sub, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.experiencesService.remove(id, req.user.sub);
  }
}

