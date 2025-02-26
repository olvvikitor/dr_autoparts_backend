import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category-dto';
import { CategoryService } from '../services/category.service';

@Controller('category')
export class CategoryController{

  constructor (private categoryService:CategoryService) {
    
  }

  @Post('new')
  async createNewCategory(@Body() data:CreateCategoryDto){
    return await this.categoryService.createNewCategory(data)
  }

}