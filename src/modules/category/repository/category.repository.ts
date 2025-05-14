import { Inject } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateCategoryDto } from '../dto/create-category-dto';
import { ResponseCategoryDto } from '../dto/response-category.dto';
import { Category } from '@prisma/client';

export class CategoryRepository {
  constructor(@Inject() private prismaService: PrismaService) {}

  async create(data: CreateCategoryDto): Promise<void> {
    await this.prismaService.category.create({
      data: { name: data.name }
    });
  }

  async findCategoryByName(nome: string): Promise<ResponseCategoryDto> {
    return await this.prismaService.category.findFirst({
      where: { name: nome }
    });
  }
  async findCategoryById(id: number): Promise<ResponseCategoryDto> {
    return await this.prismaService.category.findFirst({
      where: { id: id },
    });
  }

  async findAll(): Promise<Category[]> {
    return await this.prismaService.category.findMany({orderBy:{id:'asc'}});
  }
  async update(id: number, data: CreateCategoryDto): Promise<void> {
    await this.prismaService.category.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
  }
  async delete(id: number): Promise<void> {
    await this.prismaService.category.delete({
      where: {
        id,
      },
    });
  }
}
