import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CreateFornecedorDto } from '../dto/create-fornecedor-dto';
import { FornecedorService } from '../services/fornecedor.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/auth/authGuard.service';

@Controller('fornecedor')
export class FornecedorController{

  constructor (private fornecedorService:FornecedorService) {
    
  }

  @ApiBody({type: CreateFornecedorDto})
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
    description: 'Fornecedor já existe com esse nome',
    content: {
      'application/json': {
        example: {
          statusCode: 409,
          message: 'Fornecedor já encontrado',
          error: 'Conflict',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Fornecedor criado com sucesso',
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
  async createNewCategory(@Body() data:CreateFornecedorDto){
    return await this.fornecedorService.createNewFornecedor(data)
  }

}