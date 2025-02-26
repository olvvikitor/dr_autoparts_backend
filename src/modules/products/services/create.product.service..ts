import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDto } from '../dtos/create-product.dto';
import { CategoryService } from 'src/modules/category/services/category.service';
import { FornecedorService } from 'src/modules/fornecedor/services/fornecedor.service';
import { ModeloService } from 'src/modules/modelo/services/modelo.service';

@Injectable()
export class CreateProductService{

  constructor (@Inject() private productRepository : ProductRepository,
  @Inject() private categoryService:CategoryService,
  @Inject() private fornecedorService:FornecedorService,
  @Inject() private modeloService:ModeloService
) {
  }
  async createNewProduct(data:CreateProductDto):Promise<void>{
    const categoria = await this.categoryService.findCategoryById(data.categoryId)
    // const fornecedor = await this.fornecedorService.findFornecedorById(data.)
  
    await this.productRepository.createNewProduct(data)
  }

}