import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { UsersModule } from '../users/users.module';
import { Project } from '../entities/project.entity';
import { ProjectImage } from '../entities/project-image.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Project, ProjectImage])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
