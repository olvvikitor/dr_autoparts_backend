import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginAdminDto } from '../dtos/loginAdmin.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController{
  constructor (private adminService: AdminService) {
  }

  @ApiOperation({ summary: 'login de administrador' })
  @ApiBody({type:LoginAdminDto})
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'Login realizado com sucesso',
      schema: {
        example: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          user: {
            login: 'admins',
            password: 'senha',
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
          message: 'login ou senha incorretos',
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
          message: ['login must be an email', 'password should not be empty'],
          error: 'Bad Request',
        },
      },
    })
  @Post('auth')
  async login(@Body() loginDto:LoginAdminDto){
    return await this.adminService.login(loginDto)
  }
}