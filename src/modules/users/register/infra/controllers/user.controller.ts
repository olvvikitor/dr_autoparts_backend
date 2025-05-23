import { Body, Controller, Post } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CreateUserService } from '../../services/create.user.service';
import { CreateUserDto } from '../../entities/dtos/create-user.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {

  constructor(private userServiceRefs: ModuleRef) {}

  @ApiOperation({ summary: 'Criação de um novo usuario' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Usuário criado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Dados inválidos',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - Cpf já cadastrado',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error - Erro no servidor',
  })
  @Post('new')
  async createUser(@Body() userData: CreateUserDto) {
    const createUserService = this.userServiceRefs.get(CreateUserService);
    return await createUserService.createUser(userData);
  }
}
