import { Body, Controller, Get, Post } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { GetCartItemService } from '../services/get-cartItem.service';


@Controller('cartItem')
export class CartItemController{

  constructor (private moduleRefs:ModuleRef) {
  }

  @Get('inside')
  async getItensCart(){
    const getItensCartService = this.moduleRefs.get(GetCartItemService)
    return await getItensCartService.getCart(1)
  }
}