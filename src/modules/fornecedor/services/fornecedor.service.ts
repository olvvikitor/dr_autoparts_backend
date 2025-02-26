import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Category } from '@prisma/client';
import { CreateFornecedorDto } from '../dto/create-fornecedor-dto';

@Injectable()
export class FornecedorService{
  constructor (@Inject() private prismaService:PrismaService) {
  }

  async createNewCategory(data: CreateFornecedorDto):Promise<void>{
    const categoryExist = await this.findCategoryByCode(data.nome)
    if(categoryExist){
      throw new ConflictException('Já existe um fornecedor com esse código cadastrado')
    }
    await this.prismaService.fornecedor.create({
      data: {
        code: data.code,
        name: data.nome
      }
    })
  }

  async findCategoryByCode(code:string):Promise<Category>{
    return await this.prismaService.fornecedor.findFirst({
      where: { name: code}
    })
  }
  async findCategoryById(id:number):Promise<Category>{
    return await this.prismaService.fornecedor.findFirst({
      where: { id: id}
    })
  }

}