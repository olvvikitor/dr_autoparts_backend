import { Product } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product.repository';
import { ResponseClientProductDto } from '../../dtos/response-client-product.dto';
import { ProductMapperClient } from '../../mappers/product.mapper copy';


@Injectable()
export class GetClientProductsByNameService {
  constructor(private productRepository: ProductRepository) {}

  async execute(filter: string): Promise<ResponseClientProductDto[]> {
    
      const product = await this.productRepository.foundProducts(filter);
      if (!product) {
        throw new NotFoundException(
          `Produto com identificador: ${filter} não encontrado`,
        );
      }
      return new ProductMapperClient().parseListToDto(product); 
  }
}
