import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ModuleRef } from '@nestjs/core';
import { CreateProductService } from '../services/create.product.service.';
import { GetAllProductService } from '../services/getAll.product.service';
import { ResponseProductDto } from '../dtos/response-product.dto';
import { GetProductByIdService } from '../services/getById.product.service';

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

  @Get('/:id')
  async getProductById(@Param('id') id:string){
    const getProductService = this.modulesRefs.get(GetProductByIdService)
    return await getProductService.execute(parseInt(id))
  }

  

}