import { Module } from '@nestjs/common';
import { CartRepository } from './repositories/cart.repository';
import { CreateCartService } from './services/create-cart.service';
import { CartController } from './controller/cart.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { CartItemModule } from '../cartItem/cartItem.module';

@Module({
  imports:[PrismaModule, CartItemModule],
  providers:[CartRepository, CreateCartService],
  controllers:[CartController],
  exports:[CartRepository, CreateCartService]
})
export class CartModule{}