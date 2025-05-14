import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';
import AuthModule from 'src/shared/auth/authGuard.module';
import { CategoryRepository } from './repository/category.repository';

@Module({
  imports: [AuthModule,PrismaModule],
  providers:[CategoryService, CategoryRepository],
  controllers:[CategoryController],    
  exports:[CategoryService]
  })
export class CategoryModule{}