import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { ProductModelRepository } from './repositories/productModel.repository';

@Module({
  imports: [PrismaModule],
  providers:[ProductModelRepository],
  exports:[ProductModelRepository]
})
export class ProductModelModule{}