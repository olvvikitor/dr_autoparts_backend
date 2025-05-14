import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';


@Injectable()
export class ProductModelRepository{
  constructor (@Inject() private prismaService:PrismaService) {
  }

  async createRelation(idProduct, idModel):Promise<void>{
    await this.prismaService.productModel.create({
      data:{
        productId: idProduct,
        modelId: idModel,
      }
    })
  }
  async delete(idProduct:number):Promise<void>{
    await this.prismaService.productModel.deleteMany({
      where:{
        productId: idProduct
        
      }
  })
}
}