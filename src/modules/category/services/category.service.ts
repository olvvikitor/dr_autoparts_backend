import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category-dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Category } from '@prisma/client';
import { CategoryRepository } from '../repository/category.repository';
import { ConflictExceptions } from 'src/shared/errors/ConflicExeption';
import { ResponseCategoryDto } from '../dto/response-category.dto';
import { NotFoundExceptionHandler } from 'src/shared/errors/NotFoundExpetion';

@Injectable()
export class CategoryService {
  constructor(@Inject() private categoryRepository: CategoryRepository) {}

  async createNewCategory(data: CreateCategoryDto, role:string): Promise<void> {
    const categoryExist = await this.categoryRepository.findCategoryByName(data.nome);

    if(role !== 'ADMIN'){
      throw new UnauthorizedException
    }

    if (categoryExist) {
      throw new ConflictExceptions('Categoria', 'nome', data.nome);

    }
    await this.categoryRepository.create(data);
  }

  async findCategoryByName(nome: string): Promise<ResponseCategoryDto> {
    const categoria = await this.categoryRepository.findCategoryByName(nome);

    if(!categoria){
      throw new NotFoundExceptionHandler('Categoria', 'nome', nome)
    }
    
    return categoria
  }

  async findCategoryById(id: number): Promise<Category> {

    const categoria = await this.categoryRepository.findCategoryById(id);

    if(!categoria){
      throw new NotFoundExceptionHandler('Categoria', 'id', id)
    }

    return categoria
  }
  async findAll():Promise<Category[]>{
    return await this.categoryRepository.findAll()
  }
}
