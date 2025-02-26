import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateFornecedorDto } from '../dto/create-fornecedor-dto';
import { FornecedorService } from '../services/fornecedor.service';

@Controller('fornecedor')
export class FornecedorController{

  constructor (private fornecedorService:FornecedorService) {
    
  }

  @Post('new')
  async createNewCategory(@Body() data:CreateFornecedorDto){
    return await this.fornecedorService.createNewFornecedor(data)
  }

}