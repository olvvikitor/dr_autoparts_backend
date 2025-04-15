import { 
  Controller, 
  Post, 
  Body, 
  HttpCode, 
  HttpStatus 
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ModuleRef } from '@nestjs/core';
import { LoginUserDto } from '../../entities/dtos/login-user.dto';
import { LoginUserService } from '../../services/login.user.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly moduleRef: ModuleRef) {}

  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login realizado com sucesso',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          cpf: '12345678901',
          password: 'senha123',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Credenciais inválidas',
    schema: {
      example: {
        statusCode: 401,
        message: 'Cpf ou senha incorretos',
        error: 'Unauthorized',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Erro de validação',
    schema: {
      example: {
        statusCode: 400,
        message: ['email must be an email', 'password should not be empty'],
        error: 'Bad Request',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() userData: LoginUserDto) {
    const loginService = this.moduleRef.get(LoginUserService);
    return await loginService.execute(userData);
  }
}
