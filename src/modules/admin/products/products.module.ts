import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { ProductRepository } from './repositories/product.repository';
import { CreateProductService } from './services/create.product.service.';
import { GetAllProductService } from './services/getAll.product.service';
import { GetProductByIdService } from './services/getById.product.service';
import { CategoryModule } from '../category/category.module';
import { ModeloModule } from '../modelo/model.module';
import { FornecedorModule } from '../fornecedor/fornecedor.module';
import { ProductModelModule } from '../productModel/productModel.module';
import { ProductFornecedorModule } from '../productFornecedor/productFornecedor.module';
import { GetProductsService } from './services/getByNome.product.service';
import AuthModule from 'src/shared/auth/authGuard.module';
import { UpdateProductService } from './services/update.product.service';
import { StorageModule } from 'src/shared/providers/storages/StorageModule';
import { DeleteProductByIdService } from './services/delete.product.service';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    CategoryModule,
    ModeloModule,
    FornecedorModule,
    ProductModelModule,
    ProductFornecedorModule,
    StorageModule,
  ],
  providers: [
    ProductRepository,
    CreateProductService,
    GetAllProductService,
    GetProductByIdService,
    GetProductsService,
    UpdateProductService,
    DeleteProductByIdService
  ],
  controllers: [ProductController],
  exports: [
    ProductRepository,
    CreateProductService,
    GetAllProductService,
    GetProductByIdService,
    GetProductsService,
    UpdateProductService,
  ],
})
export class ProductModule {}
