import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product-dto';
import { ModuleRef } from '@nestjs/core';
import { CreateProductService } from '../services/create.product.service.';

@Controller('products')
export class ProductController{

  constructor (private modulesRefs:ModuleRef) {
    
  }

  @Post('new')
  async createNewProduct(@Body() data: CreateProductDto){
    const createProductService: CreateProductService = this.modulesRefs.get(CreateProductService)
    await createProductService.createNewProduct(data)
  }

}