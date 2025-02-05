import { Body, Controller, Post } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CreateCartDto } from '../dto/create-cart-dto';
import { CreateCartService } from '../services/create-cart.service';

@Controller('cart')
export class CartController{

  constructor (private moduleRefs:ModuleRef) {
  }


  @Post('new')
  async createNewCart(@Body() data:CreateCartDto):Promise<void>{
    const idClient = 1
    const createNewCartService = this.moduleRefs.get(CreateCartService);
    await createNewCartService.addItemCart(data, idClient)
     
  }

}