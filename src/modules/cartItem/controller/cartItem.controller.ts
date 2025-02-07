import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ModuleRef } from '@nestjs/core';
import { GetCartItemService } from '../services/get-cartItem.service';
import { AddItemCartDto } from '../dtos/add-item-cart.dto';
import { AddItemCartService } from '../services/create-cart.service';
import { AuthGuard } from 'src/shared/auth/authGuard.service';

@ApiTags('Cart Items') // Define a categoria da API no Swagger
@ApiBearerAuth() // Indica que o endpoint requer autenticação com JWT
@UseGuards(AuthGuard)
@Controller('cartItem')
export class CartItemController {
  constructor(private moduleRefs: ModuleRef) {}

  @Post('add')
  @ApiOperation({ summary: 'Adiciona um item ao carrinho' })
  @ApiResponse({ status: 201, description: 'Item adicionado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Usuário não autenticado' })
  async addItemCart(@Body() data: AddItemCartDto, @Req() request: any) {
    const userId = request.user.id;
    const addItemCartService = this.moduleRefs.get(AddItemCartService);
    await addItemCartService.addItemCart(data, userId);
  }

  @Get('content')
  @ApiOperation({ summary: 'Obtém os itens do carrinho' })
  @ApiResponse({ status: 200, description: 'Itens do carrinho retornados com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autenticado' })
  async getItensCart() {
    const getItensCartService = this.moduleRefs.get(GetCartItemService);
    return await getItensCartService.getCart(1);
  }
}
