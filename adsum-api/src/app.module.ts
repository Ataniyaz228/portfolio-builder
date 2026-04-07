import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { SkillsModule } from './skills/skills.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { ContactModule } from './contact/contact.module';
import { UploadModule } from './upload/upload.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { User } from './entities/user.entity';
import { Project } from './entities/project.entity';
import { Skill } from './entities/skill.entity';
import { Experience } from './entities/experience.entity';
import { ContactMessage } from './entities/contact-message.entity';
import { Testimonial } from './entities/testimonial.entity';
import { ProfileView } from './entities/profile-view.entity';
import { ProjectImage } from './entities/project-image.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [
          User,
          Project,
          Skill,
          Experience,
          ContactMessage,
          Testimonial,
          ProfileView,
          ProjectImage,
        ],
        synchronize: true,
      }),
    }),
    UsersModule,
    AuthModule,
    ProjectsModule,
    SkillsModule,
    ExperiencesModule,
    ContactModule,
    UploadModule,
    TestimonialsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
