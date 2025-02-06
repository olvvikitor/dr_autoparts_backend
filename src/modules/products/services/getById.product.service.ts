import { Product } from '@prisma/client';
import { ProductRepository } from '../repositories/product.repository';
import { Injectable } from '@nestjs/common';
import { ProductMapper } from '../mappers/product.mapper';
import { ResponseProductDto } from '../dtos/response-product.dto';

@Injectable()
export class GetProductByIdService{
  constructor(private productRepository: ProductRepository) {
  }

  async execute(id:number):Promise<ResponseProductDto>{
    const product = await this.productRepository.getProductById(id)
    return new ProductMapper().parseToDto(product)
  }
}