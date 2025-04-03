import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ModuleRef } from '@nestjs/core';
import { GetAllProductService } from '../services/getAll.product.service';
import { GetProductByIdService } from '../services/getById.product.service';
import { GetProductsService } from '../services/getByNome.product.service';
import { CreateProductService } from '../services/create.product.service.';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ResponseProductDto } from '../dtos/response-product.dto';
import { AuthGuard } from 'src/shared/auth/authGuard.service';
import { MRequest } from 'src/shared/infra/http/MRequest';
import { UpdateProductService } from '../services/update.product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from '@prisma/client';
import { DeleteProductByIdService } from '../services/delete.product.service';


@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('products')
export class ProductController {
  constructor(private modulesRefs: ModuleRef) {}

  /**
   * @route POST /products/new
   * @description Cria um novo produto no sistema
   * @param {CreateProductDto} data - Dados do produto a ser criado
   * @returns {Promise<void>}
   */
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateProductDto,

    description:
      'Dados do produto e arquivo de imagem (se presente). Requisição deve ser do tipo multipart/form-data.',
    required: true, // Define que o corpo deve ser preenchido
  },)
  @ApiOperation({
    summary:
      'Criação de um novo produto com a possibilidade de upload de uma imagem',
  })
  
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
    description:
      'Acesso negado - O usuário não tem permissão para acessar este recurso',
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
    description:
      'Recurso não encontrado - Categoria, Modelo ou Fornecedor não encontrado',
    content: {
      'application/json': {
        example: {
          statusCode: 404,
          message:
            'Categoria não encontrada | Modelo não encontrado | Fornecedor não encontrado',
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
          message: 'Criado com sucesso',
        },
      },
    },
  })
  @ApiResponse({
    status: 422,
    description:
      'Erro no processamento do arquivo - Tipo de arquivo inválido ou arquivo não enviado',
    content: {
      'application/json': {
        example: {
          statusCode: 422,
          message: 'Arquivo inválido ou não enviado',
          error: 'Unprocessable Entity',
        },
      },
    },
  })
  @Post('new')
  @UseInterceptors(FileInterceptor('image'))
  async createNewProduct(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'png',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: false,
        }),
    )
    image: Express.Multer.File,
    @Body() data: CreateProductDto,
    @Req() req: MRequest,
  ): Promise<void> {

    const urlImg = image ? (image as any).location || image.path : null;
    const createProductService: CreateProductService =
      this.modulesRefs.get(CreateProductService);

    
      if(req.user.role !== Role.ADMIN){
        throw new ForbiddenException('Usuário com perfil inválido')
      }

    await createProductService.createNewProduct(data, urlImg);
  } 

  @ApiOperation({ summary: 'busca de todos os produto' })
  /**
   * @route GET /products/all
   * @description Retorna a lista de todos os produtos cadastrados
   * @returns {Promise<Array<ResponseProductDto>>} Lista de produtos
   */
  @ApiResponse({
    status: 200,
    type: [ResponseProductDto],
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
  @ApiOperation({ summary: 'busca de produto por id' })
  @ApiResponse({
    status: 200,
    type: ResponseProductDto,
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
    const getProductByIdService = this.modulesRefs.get(GetProductByIdService);
    return await getProductByIdService.execute(parseInt(id));
  }

  /**
   * @route GET /products
   * @description Busca produtos com base em um filtro (ex: nome, código, etc.)
   * @param {string} filter - Termo para buscar produtos
   * @returns {Promise<Array<ResponseProductDto>>} Lista de produtos que correspondem ao filtro
   */
  @ApiOperation({
    summary: 'Busca de produto por nome de qualquer relacionamento',
  })
  @ApiResponse({
    status: 200,
    type: [ResponseProductDto],
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
  async getProduct(
    @Query('filter') filter: string,
  ): Promise<Array<ResponseProductDto>> {
    const getProductService = this.modulesRefs.get(GetProductsService);
    return await getProductService.execute(filter);
  }

  /**
   * @route PUT /product/update/{id}
   * @description Edita um produto no sistema
   * @param {CreateProductDto} data - Dados do produto a ser criado
   * @param idProduct -ID do produto a ser editado
   * @returns {Promise<void>}
   */
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update de produto' })
  @ApiBody({ type: CreateProductDto })
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
    description:
      'Acesso negado - O usuário não tem permissão para acessar este recurso',
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
          message:
            'Categoria não encontrada | Modelo não encontrado | Fornecedor não encontrado | Produto não encontrado',
          error: 'Not Found',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Produto Editado com sucesso',
    content: {
      'application/json': {
        example: {
          statusCode: 201,
          message: 'Editado com sucesso',
        },
      },
    },
  })
  @Put('update/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() data: CreateProductDto,
    @Req() req: MRequest,
  ): Promise<void> {
    const updateProductService = this.modulesRefs.get(UpdateProductService);

    if(req.user.role !== Role.ADMIN){
      throw new ForbiddenException('Usuário com perfil inválido')
    }

    return await updateProductService.execute(
      parseInt(id),
      data
    );
  }

  @ApiOperation({summary:'Deletar um produto'})
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
    description:
      'Acesso negado - O usuário não tem permissão para acessar este recurso',
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
          message:
            'Produto não encontrado',
          error: 'Not Found',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Produto deletado com sucesso',
    content: {
      'application/json': {
        example: {
          statusCode: 200,
          message: 'deletado com sucesso',
        },
      },
    },
  })
  @Delete('delete/:id')
  async deleteProduct(@Param('id') id:string, @Req() req: MRequest):Promise<void>{
    const deleteProductService = this.modulesRefs.get(DeleteProductByIdService)
    if(req.user.role !== Role.ADMIN){
      throw new ForbiddenException('Usuário com perfil inválido')
    }

    await deleteProductService.execute(parseInt(id))

  }
}
