import { Inject, Injectable } from '@nestjs/common';
import {
  Category,
  Fornecedor,
  Model,
  Prisma,
  PrismaClient,
  Product,
} from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ResponseProductDto } from '../dtos/response-product.dto';
import { filter } from 'rxjs';

@Injectable()
export class ProductRepository {
  constructor(@Inject() private prismaService: PrismaService) {}

  async createNewProduct(data: CreateProductDto, urlImage:string): Promise<Product> {
    return await this.prismaService.product.create({
      data: {
        name: data.name,
        code: data.code,
        description: data.description,
        price: data.price,
        priceoast: data.priceoast,
        tipo: data.tipo,
        imageUrl: urlImage,
        category:{
          connect:{id:data.categoryId}
        },
        models: {
          create: data.modelId.map((idModel: number) => ({ modelId: idModel }))
        },
        fornecedores:{
          create: data.fornecedorId.map((idFornecedor:number)=>({fornecedorId:idFornecedor}))
        }
      }
    });
  }
  async getAll(): Promise<
    (Product & {
      category: Category;
      fornecedores: { fornecedor: Fornecedor }[];
      models: { model: Model }[];
    })[]
  > {
    try {
      return await this.prismaService.product.findMany({
        include: {
          category: true,
          fornecedores: {
            include: { fornecedor: true },
          },
          models: { include: { model: true } },
        },
      });
    } catch (error) {}
  }

  async getProductById(id: number): Promise<
    Product & {
      category: Category;
      fornecedores: { fornecedor: Fornecedor }[];
      models: { model: Model }[];
    }
  > {
    try {
      return await this.prismaService.product.findFirst({
        where: {
          id: id,
        },
        include: {
          category: true,
          fornecedores: { include: { fornecedor: true } },
          models: { include: { model: true } },
        },
      });
    } catch (error) {}
  }

  async foundProducts(filter: string): Promise<
    (Product & {
      category: Category;
      fornecedores: { fornecedor: Fornecedor }[];
      models: { model: Model }[];
    })[]
  > {
    try {
      return await this.prismaService.product.findMany({
        where: {
          OR: [
            { name: { contains: filter, mode: 'insensitive' } },
            { code: { contains: filter, mode: 'insensitive' } },
            { description: { contains: filter, mode: 'insensitive' } },
            {
              models: {
                some: {
                  OR: [
                    {
                      model: {
                        name: { contains: filter, mode: 'insensitive' },
                      },
                    },
                    {
                      model: {
                        marca: { contains: filter, mode: 'insensitive' },
                      },
                    },
                  ],
                },
              },
            },
            {
              fornecedores: {
                some: {
                  OR: [
                    {
                      fornecedor: {
                        name: { contains: filter, mode: 'insensitive' },
                      },
                    },
                    {
                      fornecedor: {
                        name: { contains: filter, mode: 'insensitive' },
                      },
                    },
                  ],
                },
              },
            },
            { category: { name: { contains: filter, mode: 'insensitive' } } },
          ],
        },
        include: {
          category: true,
          fornecedores: { include: { fornecedor: true } },
          models: { include: { model: true } },
        },
      });
    } catch (error) {}
  }

  async update(id: number, data: CreateProductDto): Promise<void> {

    await this.prismaService.productFornecedor.deleteMany({
      where:{
        productId: id
      }
    })

    await this.prismaService.product.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        code: data.code,
        description: data.description,
        price: data.price,
        priceoast: data.priceoast,
        tipo: data.tipo,
        categoryId: data.categoryId,
        models: {
          create: data.modelId.map((idModel: number) => ({ modelId: idModel }))
        },
        fornecedores:{
          create: data.fornecedorId.map((idFornecedor:number)=>({fornecedorId:idFornecedor}))
        }
        
      }})
  }
}
