import { Product } from '@prisma/client';
import { ProductRepository } from '../../repositories/product.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductMapper } from '../../mappers/product.mapper';
import { ResponseProductDto } from '../../dtos/response-product.dto';
import { ResponseClientProductDto } from '../../dtos/response-client-product.dto';
import { ProductMapperClient } from '../../mappers/product.mapper copy';

@Injectable()
export class GetProductClientByIdService {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: number): Promise<ResponseClientProductDto> {
    
      const product = await this.productRepository.getProductById(id);
      if (!product) {
        throw new NotFoundException(
          `Produto com identificador: ${id} não encontrado`,
        );
      }
      
      return new ProductMapperClient().parseToDto(product); 
  }
}
