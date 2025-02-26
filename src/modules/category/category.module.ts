import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';

@Module({
  imports: [PrismaModule],
  providers:[CategoryService],
  controllers:[CategoryController],    
  exports:[CategoryService]
  })
export class CategoryModule{}