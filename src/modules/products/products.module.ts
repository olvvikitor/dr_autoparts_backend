import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { ProductRepository } from './repositories/product.repository';
import { CreateProductService } from './services/create.product.service.';
import { GetAllProductService } from './services/getAll.product.service';

@Module({
  imports:[PrismaModule],
  providers:[ProductRepository,CreateProductService, GetAllProductService],
  controllers:[ProductController],
  exports:[ProductRepository,CreateProductService,GetAllProductService],
})
export class ProductModule{}