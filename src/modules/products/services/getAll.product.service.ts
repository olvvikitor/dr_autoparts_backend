import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { Product } from '@prisma/client';
import { ResponseProductDto } from '../dtos/response-product.dto';
import { ProductMapper } from '../mappers/product.mapper';



@Injectable()
export class GetAllProductService {
  constructor(private productRepository: ProductRepository) {
  }
  async getAllProducts(): Promise<ResponseProductDto[]> {
    const products = await this.productRepository.getAll()
    const mapper = new ProductMapper().parseListToDto(products)
    return await mapper
    
  }
}