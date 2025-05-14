import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { ProductFornecedorRepository } from './repositories/productFornecedor.repository';

@Module({
  imports: [PrismaModule],
  providers:[ProductFornecedorRepository],
  exports:[ProductFornecedorRepository]
})
export class ProductFornecedorModule{}