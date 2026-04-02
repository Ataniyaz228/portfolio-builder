import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Req() req: any, @Body() createData: any) {
    return this.projectsService.create(req.user.sub, createData);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.projectsService.findAll(req.user.sub);
  }

  @Patch('reorder')
  reorder(
    @Req() req: any,
    @Body() items: { id: string; order_index: number }[],
  ) {
    return this.projectsService.reorder(req.user.sub, items);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.projectsService.findOne(id, req.user.sub);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Req() req: any, @Body() updateData: any) {
    return this.projectsService.update(id, req.user.sub, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.projectsService.remove(id, req.user.sub);
  }

  @Post(':id/images')
  addImage(
    @Param('id') id: string,
    @Req() req: any,
    @Body() data: { image_url: string },
  ) {
    return this.projectsService.addImage(id, req.user.sub, data.image_url);
  }

  @Delete('images/:imageId')
  removeImage(@Param('imageId') imageId: string, @Req() req: any) {
    return this.projectsService.removeImage(imageId, req.user.sub);
  }

  @Patch(':id/images/reorder')
  reorderImages(
    @Param('id') id: string,
    @Req() req: any,
    @Body() items: { id: string; order_index: number }[],
  ) {
    return this.projectsService.reorderImages(id, req.user.sub, items);
  }
}

