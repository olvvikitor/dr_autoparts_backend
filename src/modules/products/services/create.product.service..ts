import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDto } from '../dtos/create-product-dto';

@Injectable()
export class CreateProductService{

  constructor (@Inject() private productRepository : ProductRepository) {
  }
  async createNewProduct(data:CreateProductDto):Promise<void>{
    await this.productRepository.createNewProduct(data)
  }

}