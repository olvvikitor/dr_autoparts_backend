import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { GetCartItemService } from '../services/get-cartItem.service';
import { AddItemCartDto } from '../dtos/add-item-cart.dto';
import { AddItemCartService } from '../services/create-cart.service';
import { AuthGuard } from 'src/shared/auth/authGuard.service';

@UseGuards(AuthGuard)
@Controller('cartItem')
export class CartItemController{

  constructor (private moduleRefs:ModuleRef) {
  }

  @Post('add')
  async addItemCart(@Body() data : AddItemCartDto , @Req() request:any){
    console.log('payload', request.user)
    const userId = request.user.id
    const addItemCartService = this.moduleRefs.get(AddItemCartService)
    await addItemCartService.addItemCart(data, userId)
  }

  @Get('content')
  async getItensCart(){
    const getItensCartService = this.moduleRefs.get(GetCartItemService)
    return await getItensCartService.getCart(1)
  }
}