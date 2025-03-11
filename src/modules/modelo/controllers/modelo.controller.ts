import { 
  Body, 
  Controller, 
  Get, 
  Param, 
  Post, 
  Put, 
  Delete, 
  UseGuards 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ModeloService } from '../services/modelo.service';
import { CreateModeloDto } from '../dto/create-modelo-dto';
import { Model } from '@prisma/client';
import { AuthGuard } from 'src/shared/auth/authGuard.service';

@ApiTags('Modelos') 
@Controller('modelo')
export class ModeloController {

  constructor(private modeloService: ModeloService) {}

  @Post('new')
  @ApiBearerAuth()
  @UseGuards(AuthGuard) 
  @ApiOperation({ summary: 'Cria um novo modelo' })
  @ApiResponse({ status: 201, description: 'Modelo criado com sucesso' })
  @ApiBody({ type: CreateModeloDto })
  async createNewCategory(@Body() data: CreateModeloDto) {
    return await this.modeloService.createNewModel(data);
  }

  @Get('')
  @ApiOperation({ summary: 'Lista todos os modelos' })
  @ApiResponse({ status: 200, description: 'Lista de modelos', type: [CreateModeloDto] })
  async findAllModels(): Promise<Array<Model>> {
    return await this.modeloService.findAllModels();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Busca um modelo pelo ID' })
  @ApiParam({ name: 'id', example: '1', description: 'ID do modelo' })
  @ApiResponse({ status: 200, description: 'Detalhes do modelo', type: CreateModeloDto })
  async findModelById(@Param('id') id: string): Promise<Model> {
    return await this.modeloService.findModelById(parseInt(id));
  }

  @Get('/name/:name')
  @ApiOperation({ summary: 'Busca um modelo pelo nome' })
  @ApiParam({ name: 'name', example: 'Civic', description: 'Nome do modelo' })
  @ApiResponse({ status: 200, description: 'Detalhes do modelo', type: CreateModeloDto })
  async findModelByName(@Param('name') name: string): Promise<Model> {
    return await this.modeloService.findModelByNome(name);
  }

  @Put('/:id')
  @ApiBearerAuth() 
  @UseGuards(AuthGuard) 
  @ApiOperation({ summary: 'Atualiza um modelo' })
  @ApiParam({ name: 'id', example: '1', description: 'ID do modelo' })
  @ApiBody({ type: CreateModeloDto })
  @ApiResponse({ status: 200, description: 'Modelo atualizado com sucesso' })
  async updateModel(@Param('id') id: string, @Body() data: CreateModeloDto) {
    return await this.modeloService.updateModel(parseInt(id), data);
  }

  @Delete('/:id')
  @ApiBearerAuth() 
  @UseGuards(AuthGuard) 
  @ApiOperation({ summary: 'Exclui um modelo' })
  @ApiParam({ name: 'id', example: '1', description: 'ID do modelo' })
  @ApiResponse({ status: 200, description: 'Modelo excluído com sucesso' })
  async deleteModel(@Param('id') id: string) {
    return await this.modeloService.deleteModel(parseInt(id));
  }
}
