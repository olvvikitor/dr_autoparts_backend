import { Inject, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, Product } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateProductDto } from '../dtos/create-product.dto';

@Injectable()
export class ProductRepository{
  constructor (@Inject() private prismaService:PrismaService) {
  }

  async createNewProduct(data : CreateProductDto):Promise<void>{
    await this.prismaService.product.create({
      data: {
        name: data.name,
        code: data.code,
        description: data.description,
        price: data.price,
        priceoast: data.priceoast,
        tipo: data.tipo,
        categoryId: data.categoryId

      },
    })
  }
  async getAll():Promise<Product[]>{
    return await this.prismaService.product.findMany()
  }

  async getProductById(id:number):Promise<Product>{
    return await this.prismaService.product.findFirst({
      where:{
        id:id
      }
    })
  }
}