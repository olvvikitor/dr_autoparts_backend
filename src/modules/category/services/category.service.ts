import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category-dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService{
  constructor (@Inject() private prismaService:PrismaService) {
  }

  async createNewCategory(data: CreateCategoryDto):Promise<void>{
    const categoryExist = await this.findCategoryByName(data.nome)
    if(categoryExist){
      throw new ConflictException('Já existe uma categoria cadastrada com esse nome')
    }
    await this.prismaService.category.create({
      data: {name:data.nome}
    })
  }

  async findCategoryByName(nome:string):Promise<Category>{
    return await this.prismaService.category.findFirst({
      where: { name: nome}
    })
  }
  async findCategoryById(id:number):Promise<Category>{
    return await this.prismaService.category.findFirst({
      where: { id: id}
    })
  }

}