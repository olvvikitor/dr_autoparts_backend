import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDto } from '../dtos/create-product.dto';

@Injectable()
export class UpdateProductService{

  constructor (@Inject() private productRepository: ProductRepository) {
  }

  async execute(id: number, data: CreateProductDto):Promise<void>{
    console.log(data)
    await this.productRepository.update(id, data)
  }

}