import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category-dto';
import { CategoryService } from '../services/category.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/auth/authGuard.service';
import { ResponseCategoryDto } from '../dto/response-category.dto';
import { MRequest } from 'src/shared/infra/http/MRequest';


@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @ApiOperation({ summary: 'Cria uma nova categoria' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateCategoryDto })
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
    status: 409,
    description: 'Categoria já existe com esse nome',
    content: {
      'application/json': {
        example: {
          statusCode: 409,
          message: 'Categoria já encontrada',
          error: 'Conflict',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Categoria criada com sucesso',
    content: {
      'application/json': {
        example: {
          statusCode: 201,
          message: 'Criado com sucesso!',
        },
      },
    },
  })
  @Post('new')
  async createNewCategory(
    @Body() data: CreateCategoryDto,
    @Req() req: MRequest,
  ) {
        if(req.user.role !== 'ADMIN'){
          throw new UnauthorizedException('Usuário sem permissão')
        }
    
    return await this.categoryService.createNewCategory(data);
  }

  @ApiOperation({ summary: 'Busca uma categoria por ID' })
  @ApiResponse({
    status: 404,
    description: 'Categoria não encontrada',
    content: {
      'application/json': {
        example: {
          statusCode: 404,
          message: 'Categoria não encontrada',
          error: 'NotFound',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    type: ResponseCategoryDto,
    description: 'Sucesso',
  })
  @Get('/:id')
  async findById(@Param('id') id: string): Promise<ResponseCategoryDto> {
    return this.categoryService.findCategoryById(parseInt(id));
  }


  @ApiOperation({ summary: 'Busca uma categoria por Nome' })
  @ApiResponse({
    status: 404,
    description: 'Categoria não encontrada',
    content: {
      'application/json': {
        example: {
          statusCode: 404,
          message: 'Categoria não encontrada',
          error: 'NotFound',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    type: ResponseCategoryDto,
    description: 'Sucesso',
  })
  @Get('/:name')
  async findByName(@Param('name') name: string): Promise<ResponseCategoryDto> {
    return this.categoryService.findCategoryByName(name);
  }

  @ApiOperation({ summary: 'Busca todas as categoria' })
  @ApiResponse({
    status: 200,
    type: [ResponseCategoryDto],
    description: 'Lista de categorias',
  })
  @Get()
  async findAll(): Promise<ResponseCategoryDto[]> {
    return await this.categoryService.findAll();
  }
  @ApiOperation({ summary: 'Atualiza uma categoria por Id' })
  @ApiResponse({
    status: 200,
    description: 'Categoria atualizada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoria não encontrada',
    content: {
      'application/json': {
        example: {
          statusCode: 404,
          message: 'Categoria não encontrada',
          error: 'NotFound',
        },
      },
    },
  })
  @Put('/:id')
  async update(@Param('id') id: string, @Body() data: CreateCategoryDto, @Req() request:MRequest): Promise<void> {

        if(request.user.role !== 'ADMIN'){
          throw new UnauthorizedException('Usuário sem permissão.')
        }
    
    return await this.categoryService.update(parseInt(id), data);
  }

  @ApiOperation({ summary: 'Deleta uma categoria por Id' })
  @ApiResponse({
    status: 200,
    description: 'Categoria excluída com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoria não encontrada',
    content: {
      'application/json': {
        example: {
          statusCode: 404,
          message: 'Categoria não encontrada',
          error: 'NotFound',
        },
      },
    },
  })
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.categoryService.delete(parseInt(id));
  }
}