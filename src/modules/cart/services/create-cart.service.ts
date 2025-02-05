import { Inject, Injectable } from '@nestjs/common';
import { CreateCartDto } from '../dto/create-cart-dto';
import { CartItem } from '@prisma/client';
import { CartRepository } from '../repositories/cart.repository';
import { CartItemRepository } from 'src/modules/cartItem/repositories/cartItem.repository';

@Injectable()
export class CreateCartService{
  constructor (private cartRepository:CartRepository,
    @Inject() private cartItemRepository: CartItemRepository
  ) {
    
  }

  async addItemCart(data: CreateCartDto, userId:number):Promise<void>{

    const cartExists = await this.cartRepository.findCart(userId);

    if(!cartExists){
      await this.cartRepository.createNewCart(userId);
    }

    const existItemInCart = await this.cartItemRepository.findCartItemByUser(userId, data.productId);

    if(existItemInCart){
      const somaQtd = existItemInCart.quantity += data.quantity
      await this.cartItemRepository.updateCart(existItemInCart.id, somaQtd)
    }
    else{
      console.log(cartExists)
      
      await this.cartItemRepository.addCartItem({cartId:cartExists.id,productId:data.productId, quantity: data.quantity})
    }
  }
}