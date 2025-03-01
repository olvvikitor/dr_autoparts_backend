import { Product } from '@prisma/client';
import { ProductRepository } from '../repositories/product.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductMapper } from '../mappers/product.mapper';
import { ResponseProductDto } from '../dtos/response-product.dto';

@Injectable()
export class GetProductsService {
  constructor(private productRepository: ProductRepository) {}

  async execute(filter: string): Promise<ResponseProductDto[]> {
    
      const product = await this.productRepository.foundProducts(filter);
      if (!product) {
        throw new NotFoundException(
          `Produto com identificador: ${filter} não encontrado`,
        );
      }
      return new ProductMapper().parseListToDto(product); 
  }
}
