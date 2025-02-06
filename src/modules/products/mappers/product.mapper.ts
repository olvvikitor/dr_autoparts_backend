import { Product } from '@prisma/client';
import { ResponseProductDto } from '../dtos/response-product.dto';

export class ProductMapper{
  async parseToDto(product:Product):Promise<ResponseProductDto>{
    return {
      id: product.id,
      name:product.name,
      imgUrl: product.imageUrl
    }
  }

   async parseListToDto(products:Product[]):Promise<ResponseProductDto[]>{
    const productsTransform:ResponseProductDto[] =  await Promise.all(products.map(async(product)=>{
      return {
        id: product.id,
        name: product.name,
        imgUrl: product.imageUrl
      }
    }))
    return productsTransform
  }
}