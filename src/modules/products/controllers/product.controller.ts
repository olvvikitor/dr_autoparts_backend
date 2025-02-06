import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ModuleRef } from '@nestjs/core';
import { CreateProductService } from '../services/create.product.service.';
import { GetAllProductService } from '../services/getAll.product.service';

@Controller('products')
export class ProductController{

  constructor (private modulesRefs:ModuleRef) {
    
  }

  @Post('new')
  async createNewProduct(@Body() data: CreateProductDto){
    const createProductService: CreateProductService = this.modulesRefs.get(CreateProductService)
    await createProductService.createNewProduct(data)
  }

  @Get('all')
  async getAllProducts(){
    const getAllProductsService = this.modulesRefs.get(GetAllProductService)
    return await getAllProductsService.getAllProducts()
  }

}