import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { ProductRepository } from './repositories/product.repository';
import { CreateProductService } from './services/create.product.service.';

@Module({
  imports:[PrismaModule],
  providers:[ProductRepository,CreateProductService],
  controllers:[ProductController],
  exports:[ProductRepository,CreateProductService],
})
export class ProductModule{}