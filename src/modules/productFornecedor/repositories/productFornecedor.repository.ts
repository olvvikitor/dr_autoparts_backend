import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';


@Injectable()
export class ProductFornecedorRepository{
  constructor (@Inject() private prismaService:PrismaService) {
  }

  async createRelation(idProduct:number, idFornecedor:number):Promise<void>{
    await this.prismaService.productFornecedor.create({
      data:{
        fornecedorId: idFornecedor,
        productId: idProduct
      }
    })
  }
}