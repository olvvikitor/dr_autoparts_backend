import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ModuleRef } from '@nestjs/core';
import { GetAllProductService } from '../services/getAll.product.service';
import { GetProductByIdService } from '../services/getById.product.service';
import { GetProductsService } from '../services/getByNome.product.service';
import { CreateProductService } from '../services/create.product.service.';

@Controller('products')
export class ProductController {
  constructor(private modulesRefs: ModuleRef) {}

  /**
   * @route POST /products/new
   * @description Cria um novo produto no sistema
   * @param {CreateProductDto} data - Dados do produto a ser criado
   * @returns {Promise<void>}
   */
  @Post('new')
  async createNewProduct(@Body() data: CreateProductDto) {
    const createProductService: CreateProductService = this.modulesRefs.get(CreateProductService);
    await createProductService.createNewProduct(data);
  }

  /**
   * @route GET /products/all
   * @description Retorna a lista de todos os produtos cadastrados
   * @returns {Promise<Array<any>>} Lista de produtos
   */
  @Get('/all')
  async getAllProducts() {
    const getAllProductsService = this.modulesRefs.get(GetAllProductService);
    return await getAllProductsService.getAllProducts();
  }

  /**
   * @route GET /products/:id
   * @description Retorna um produto específico pelo ID
   * @param {string} id - ID do produto a ser buscado
   * @returns {Promise<any>} Produto correspondente ao ID informado
   */
  @Get('/:id')
  async getProductById(@Param('id') id: string) {
    console.log(id);
    const getProductByIdService = this.modulesRefs.get(GetProductByIdService);
    return await getProductByIdService.execute(parseInt(id));
  }

  /**
   * @route GET /products
   * @description Busca produtos com base em um filtro (ex: nome, código, etc.)
   * @param {string} filter - Termo para buscar produtos
   * @returns {Promise<Array<any>>} Lista de produtos que correspondem ao filtro
   */
  @Get('/')
  async getProduct(@Query('filter') filter: string) {
    console.log(filter);
    const getProductService = this.modulesRefs.get(GetProductsService);
    return await getProductService.execute(filter);
  }
}
