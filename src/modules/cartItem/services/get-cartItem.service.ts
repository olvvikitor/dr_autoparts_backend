import { Cart, CartItem } from '@prisma/client';
import { CartItemRepository } from '../repositories/cartItem.repository';
import { Inject, Injectable } from '@nestjs/common';
import { CartRepository } from 'src/modules/cart/repositories/cart.repository';

@Injectable()
export class GetCartItemService{
  constructor (private cartItemRepository : CartItemRepository, 
    @Inject() private cartRepository:CartRepository) {
  }

  async getCart(userId:number):Promise<CartItem[]>{
    const cart = await this.cartRepository.findCart(userId)
    return await this.cartItemRepository.findItensCart(cart.id);
  }
}