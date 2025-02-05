import { Injectable } from '@nestjs/common';
import { Cart, CartItem, Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateCartDto } from '../dto/create-cart-dto';


@Injectable()
export class CartRepository {
  constructor(private prismaService: PrismaService) {

  }

  async createNewCart(userId: number): Promise<void> {
    await this.prismaService.cart.create({
      data: {
        userId: userId
      }
    })
  }
  async findCart(userId:number):Promise<Cart|null>{
    return await this.prismaService.cart.findFirst({
      where: {
        userId:userId, status:'ativo'
      }
    })
  }
}