import { Body, Controller, Get, Param, Post, Put, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ModuleRef } from '@nestjs/core';
import { GetAllProductService } from '../services/getAll.product.service';
import { GetProductByIdService } from '../services/getById.product.service';
import { GetProductsService } from '../services/getByNome.product.service';
import { CreateProductService } from '../services/create.product.service.';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ResponseProductDto } from '../dtos/response-product.dto';
import { AuthGuard } from 'src/shared/auth/authGuard.service';
import { MRequest } from 'src/shared/infra/http/MRequest';
import { UpdateProductService } from '../services/update.product.service';

@Controller('products')
export class ProductController {
  constructor(private modulesRefs: ModuleRef) {}

  /**
   * @route POST /products/new
   * @description Cria um novo produto no sistema
   * @param {CreateProductDto} data - Dados do produto a ser criado
   * @returns {Promise<void>}
   */
  @UseGuards(AuthGuard)
  @ApiBody({type:CreateProductDto})
  @ApiResponse({
    status: 401,
    description: 'Não autenticado - O usuário precisa estar autenticado',
    content: {
      'application/json': {
        example: {
          statusCode: 401,
          message: 'Token inválido ou ausente',
          error: 'Unauthorized',
        },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso negado - O usuário não tem permissão para acessar este recurso',
    content: {
      'application/json': {
        example: {
          statusCode: 403,
          message: 'Você não tem permissão para acessar este recurso',
          error: 'Forbidden',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Recurso não encontrado',
    content: {
      'application/json': {
        example: {
          statusCode: 404,
          message: 'Categoria não encontrada | Modelo não encontrado | Fornecedor não encontrado',
          error: 'Not Found',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Produto criado com sucesso',
    content: {
      'application/json': {
        example: {
          statusCode: 201,
          message: 'Criado com sucesso'
        },
      },
    },
  })
  @Post('new')
  async createNewProduct(@Body() data: CreateProductDto, @Req() req: any): Promise<void> {
    const createProductService: CreateProductService = this.modulesRefs.get(CreateProductService);
    await createProductService.createNewProduct(data, req.user.role);
  }

  /**
   * @route GET /products/all
   * @description Retorna a lista de todos os produtos cadastrados
   * @returns {Promise<Array<ResponseProductDto>>} Lista de produtos
   */
  @ApiResponse({
    status: 200,
    type:[ResponseProductDto],
    description: 'Produtos carregados com sucesso',
    content: {
      'application/json': {
        example: {
          statusCode: 200,
          message: 'Carregado com sucesso',
        },
      },
    },
  })
  @Get('/all')
  async getAllProducts(): Promise<Array<ResponseProductDto>> {
    const getAllProductsService = this.modulesRefs.get(GetAllProductService);
    return await getAllProductsService.getAllProducts();
  }

  /**
   * @route GET /products/:id
   * @description Retorna um produto específico pelo ID
   * @param {string} id - ID do produto a ser buscado
   * @returns {Promise<any>} Produto correspondente ao ID informado
   */
  
  @ApiResponse({
    status: 200,
    type:ResponseProductDto,
    description: 'Produto carregados com sucesso',
    content: {
      'application/json': {
        example: {
          statusCode: 200,
          message: 'Carregado com sucesso',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Produto não encontrado',
    content: {
      'application/json': {
        example: {
          statusCode: 404,
          message: 'NotFound',
        },
      },
    },
  })
  @Get('/:id')
  async getProductById(@Param('id') id: string): Promise<ResponseProductDto> {
    console.log(id);
    const getProductByIdService = this.modulesRefs.get(GetProductByIdService);
    return await getProductByIdService.execute(parseInt(id));
  }

  /**
   * @route GET /products
   * @description Busca produtos com base em um filtro (ex: nome, código, etc.)
   * @param {string} filter - Termo para buscar produtos
   * @returns {Promise<Array<ResponseProductDto>>} Lista de produtos que correspondem ao filtro
   */

  @ApiResponse({
    status: 200,
    type:[ResponseProductDto],
    description: 'Produto carregados com sucesso',
    content: {
      'application/json': {
        example: {
          statusCode: 200,
          message: 'Carregado com sucesso',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Produto não encontrado',
    content: {
      'application/json': {
        example: {
          statusCode: 404,
          message: 'NotFound',
        },
      },
    },
  })
  @Get('/')
  async getProduct(@Query('filter') filter: string): Promise<Array<ResponseProductDto>> {
    const getProductService = this.modulesRefs.get(GetProductsService);
    return await getProductService.execute(filter);
  }

  @Put('update/:id')
  async updateProduct(@Param('id') id:string,@Body() data: CreateProductDto):Promise<void>{
    const updateProductService = this.modulesRefs.get(UpdateProductService);
    return await updateProductService.execute(parseInt(id),data);
  }
}
