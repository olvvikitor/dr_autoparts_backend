import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDto } from '../dtos/create-product.dto';
import { CategoryService } from 'src/modules/category/services/category.service';

@Injectable()
export class CreateProductService{

  constructor (@Inject() private productRepository : ProductRepository, @Inject() private categoryService:CategoryService) {
  }
  async createNewProduct(data:CreateProductDto):Promise<void>{
    
    const categoria = await this.categoryService.findCategoryById(data.categoryId)


    await this.productRepository.createNewProduct(data)
  }

}