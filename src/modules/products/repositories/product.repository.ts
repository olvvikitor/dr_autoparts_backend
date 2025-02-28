import { Inject, Injectable } from '@nestjs/common';
import { Category, Fornecedor, Model, Prisma, PrismaClient, Product } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ResponseProductDto } from '../dtos/response-product.dto';

@Injectable()
export class ProductRepository{
  constructor (@Inject() private prismaService:PrismaService) {
  }

  async createNewProduct(data : CreateProductDto):Promise<Product>{
    return await this.prismaService.product.create({
      data: {
        name: data.name,
        code: data.code,
        description: data.description,
        price: data.price,
        priceoast: data.priceoast,
        tipo: data.tipo,
        categoryId: data.categoryId,
       },
       include:{category:true, fornecedores:true, models:true}
    })
  }
  async getAll():Promise<(Product & { category: Category; fornecedores: { fornecedor: Fornecedor }[]; models: { model: Model }[] })[]>{
    return await this.prismaService.product.findMany({
      include:{

        category:true,
        fornecedores:{
          include:{fornecedor:true}},
          models:{include:{model:true}},
      },
      
    })
  
  }

  async getProductById(id:number):Promise<any>{
    return await this.prismaService.product.findFirst({
      where:{
        id:id
      },
       include:{category:true, fornecedores:true,models:true}
    })
  }
}