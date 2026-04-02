import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Post()
  create(@Request() req: any, @Body() data: any) {
    return this.testimonialsService.create(req.user.sub, data);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.testimonialsService.findAll(req.user.sub);
  }

  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() data: any) {
    return this.testimonialsService.update(id, req.user.sub, data);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.testimonialsService.remove(id, req.user.sub);
  }
}
