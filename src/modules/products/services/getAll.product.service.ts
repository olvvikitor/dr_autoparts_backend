import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { ViewProductDto } from '../dtos/view-product.dto';
import { Product } from '@prisma/client';



@Injectable()
export class GetAllProductService {
  constructor(private productRepository: ProductRepository) {
  }
  async getAllProducts(): Promise<ViewProductDto[]> {
    const products = await this.productRepository.getAll()
    return await this.productTransform(products)
    
  }

  private async productTransform(products:Product[]):Promise<ViewProductDto[]>{
    const productsTransform =  await Promise.all(products.map(async(product)=>{
      return {
        id: product.id,
        name: product.name,
      }
    }))
    return productsTransform
  }
}