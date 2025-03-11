import { 
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards
} from '@nestjs/common';
import { CreateFornecedorDto } from '../dto/create-fornecedor-dto';
import { FornecedorService } from '../services/fornecedor.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/auth/authGuard.service';
import { ResponseFornecedorDto } from '../dto/response-fornecedor.dto';

@ApiTags('Fornecedor')
@Controller('fornecedor')
export class FornecedorController {
  constructor(private fornecedorService: FornecedorService) {}

  @ApiOperation({ summary: 'Cria um novo fornecedor' })
  @ApiBody({ type: CreateFornecedorDto })
  @ApiResponse({ status: 201, description: 'Fornecedor criado com sucesso' })
  @ApiResponse({ status: 409, description: 'Fornecedor já existe com esse nome' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('new')
  async createNewFornecedor(@Body() data: CreateFornecedorDto) {
    return await this.fornecedorService.createNewFornecedor(data);
  }

  @ApiOperation({ summary: 'Lista todos os fornecedores' })
  @ApiResponse({ status: 200, description: 'Lista de fornecedores retornada com sucesso' })
  @Get('/')
  async findAllFornecedor(): Promise<Array<ResponseFornecedorDto>> {
    return await this.fornecedorService.findFornecedores();
  }

  @ApiOperation({ summary: 'Obtém um fornecedor pelo ID' })
  @ApiResponse({ status: 200, description: 'Fornecedor encontrado' })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado' })
  @Get('/:id')
  async getFornecedorById(@Param('id') id: string): Promise<ResponseFornecedorDto> {
    return await this.fornecedorService.findFornecedorById(parseInt(id));
  }

  @ApiOperation({ summary: 'Obtém um fornecedor pelo nome' })
  @ApiResponse({ status: 200, description: 'Fornecedor encontrado' })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado' })
  @Get('/:name')
  async getFornecedorByName(@Param('name') name: string): Promise<ResponseFornecedorDto> {
    return await this.fornecedorService.findFornecedorByName(name);
  }

  @ApiOperation({ summary: 'Obtém um fornecedor pelo código' })
  @ApiResponse({ status: 200, description: 'Fornecedor encontrado' })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado' })
  @Get('/:code')
  async getFornecedorByCode(@Param('code') code: string): Promise<ResponseFornecedorDto> {
    return await this.fornecedorService.findFornecedorByCode(code);
  }

  @ApiOperation({ summary: 'Atualiza um fornecedor pelo ID' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Fornecedor atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @Put('/:id')
  async updateFornecedorById(@Param('id') id: string, @Body() data: CreateFornecedorDto): Promise<void> {
    return await this.fornecedorService.update(parseInt(id), data);
  }

  @ApiOperation({ summary: 'Exclui um fornecedor pelo ID' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Fornecedor excluído com sucesso' })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @Delete('/:id')
  async deleteById(@Param('id') id: string): Promise<void> {
    return await this.fornecedorService.deleteById(parseInt(id));
  }
}
