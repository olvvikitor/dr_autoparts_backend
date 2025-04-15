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

  async createNewCategory(data: CreateCategoryDto): Promise<void> {
    const categoryExist = await this.categoryRepository.findCategoryByName(data.name);

    if (categoryExist) {
      throw new ConflictExceptions('Categoria', 'nome', data.name);

    }
    await this.categoryRepository.create(data);

  }

  async findCategoryByName(name: string): Promise<ResponseCategoryDto> {
    const categoria = await this.categoryRepository.findCategoryByName(name);

    if(!categoria){
      throw new NotFoundExceptionHandler('Categoria', 'nome', name)
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
  async update(id:number, data:CreateCategoryDto):Promise<void>{

    const categoryExist = await this.categoryRepository.findCategoryById(id);

    if(!categoryExist){
      throw new NotFoundExceptionHandler('Categoria', 'id', id)
    }

    const existsName = await this.categoryRepository.findCategoryByName(data.name)

    if(existsName){
      if(existsName.id !== id){
        throw new ConflictExceptions('Category', 'name', data.name)
      }
    }

    return await this.categoryRepository.update(id, data);

  }
  async delete(id:number):Promise<void>{
    
    return await this.categoryRepository.delete(id);
  }
}
