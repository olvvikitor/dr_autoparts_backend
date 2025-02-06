import { Inject, Injectable } from '@nestjs/common'
import { CartItem, Prisma } from '@prisma/client'
import { CreateCartDto } from 'src/modules/cart/dto/create-cart.dto'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { AddItemCartDto } from './dto/add-cartItem-dto'


@Injectable()
export class CartItemRepository{

  constructor (@Inject() private prismaService:PrismaService) {
  }

  async findCartItemByUser(userId: number, productId: number): Promise<CartItem | null> {
    return await this.prismaService.cartItem.findFirst({
      where: {
        cart: {
          userId: userId
        },
        productId: productId
      }
    })
  }
  
  async updateCart(id: number, quantity: number): Promise<void> {
    await this.prismaService.cartItem.update({
      where: { id: id },
      data: { quantity: quantity }
    })
  }
  async addCartItem(data: AddItemCartDto):Promise<void>{
    await this.prismaService.cartItem.create({
      data: {
        cart: {connect: {id: data.cartId}},
        product:{connect:{id:data.productId}},
        quantity: data.quantity
      }
    })
  }
}