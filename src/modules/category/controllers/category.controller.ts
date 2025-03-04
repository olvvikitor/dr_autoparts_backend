import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category-dto';
import { CategoryService } from '../services/category.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateFornecedorDto } from 'src/modules/fornecedor/dto/create-fornecedor-dto';
import { AuthGuard } from 'src/shared/auth/authGuard.service';
import { ResponseCategoryDto } from '../dto/response-category.dto';
import { Request } from 'express';
import { MRequest } from 'src/shared/infra/http/MRequest';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
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
    status: 409,
    description: 'Categoria já existe com esse nome',
    content: {
      'application/json': {
        example: {
          statusCode: 409,
          message: 'Categoria já encontrado',
          error: 'Conflict',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Categoria criado com sucesso',
    content: {
      'application/json': {
        example: {
          statusCode: 201,
          message: 'Criado com sucesso!',
        },
      },
    },
  })
  @UseGuards(AuthGuard)
  @Post('new')
  async createNewCategory(
    @Body() data: CreateCategoryDto,
    @Req() req: MRequest,
  ) {
    return await this.categoryService.createNewCategory(data, req.user.role);
  }

  @ApiResponse({
    status: 404,
    description: 'Catergoria não encontrada',
    content: {
      'application/json': {
        example: {
          statusCode: 404,
          message: 'Categoria já encontrado',
          error: 'NotFound',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    type: ResponseCategoryDto,
    description: 'Sucesso',
    content: {
      'application/json': {
        example: {
          statusCode: 201,
          message: 'Success!',
        },
      },
    },
  })
  @Get('/:id')
  async findById(@Param('id') id: string): Promise<ResponseCategoryDto> {
    return this.categoryService.findCategoryById(parseInt(id));
  }
  @ApiResponse({
    status: 404,
    description: 'Catergoria não encontrada',
    content: {
      'application/json': {
        example: {
          statusCode: 404,
          message: 'Categoria não encontrado',
          error: 'NotFound',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    type: ResponseCategoryDto,
    description: 'Sucesso',
    content: {
      'application/json': {
        example: {
          statusCode: 201,
          message: 'Success!',
        },
      },
    },
  })
  @Get('/:name')
  async findByName(@Param('name') name: string): Promise<ResponseCategoryDto> {
    return this.categoryService.findCategoryByName(name);
  }

  @ApiResponse({
    status: 404,
    description: 'Catergoria não encontrada',
    content: {
      'application/json': {
        example: {
          statusCode: 404,
          message: 'Categoria já encontrado',
          error: 'NotFound',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    type: [ResponseCategoryDto],
    description: 'Sucesso',
    content: {
      'application/json': {
        example: {
          statusCode: 201,
          message: 'Success!',
        },
      },
    },
  })
  @Get()
  async findAll(): Promise<ResponseCategoryDto[]> {
    return await this.categoryService.findAll();
  }
}
