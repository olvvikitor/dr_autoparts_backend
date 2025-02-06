import { Body, Controller, Get, Post } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CreateCartDto } from '../dto/create-cart.dto';

@Controller('cart')
export class CartController{

  constructor (private moduleRefs:ModuleRef) {
  }

}