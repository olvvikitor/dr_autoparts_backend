import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product.repository';
import { Product } from '@prisma/client';
import { ResponseProductDto } from '../../dtos/response-product.dto';
import { ProductMapper } from '../../mappers/product.mapper';
import { ResponseClientProductDto } from '../../dtos/response-client-product.dto';
import { ProductMapperClient } from '../../mappers/product.mapper copy';



@Injectable()
export class GetAllProductClientService {
  constructor(private productRepository: ProductRepository) {
  }
  async getAllProducts(): Promise<ResponseClientProductDto[]> {
    const products = await this.productRepository.getAll() 
    const mapper = await new ProductMapperClient().parseListToDto(products)
    return  mapper
    
  }
}