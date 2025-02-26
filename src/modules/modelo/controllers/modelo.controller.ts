import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ModeloService } from '../services/modelo.service';
import { CreateFornecedorDto } from 'src/modules/fornecedor/dto/create-fornecedor-dto';
import { CreateModeloDto } from '../dto/create-modelo-dto';

@Controller('modelo')
export class ModeloController{

  constructor (private modeloService:ModeloService) {
    
  }

  @Post('new')
  async createNewCategory(@Body() data:CreateModeloDto){
    return await this.modeloService.createNewModel(data)
  }

}