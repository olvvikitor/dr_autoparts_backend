import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { CartItemRepository } from './repositories/cartItem.repository';
import { GetCartItemService } from './services/get-cartItem.service';
import { CartModule } from '../cart/cart.module';
import { CartItemController } from './controller/cartItem.controller';
import { AddItemCartService } from './services/create-cart.service';
import AuthModule from 'src/shared/auth/authGuard.module';

@Module({
  imports:[PrismaModule, forwardRef(()=>CartModule), AuthModule],
  providers:[CartItemRepository,GetCartItemService, AddItemCartService],
  controllers:[CartItemController],
  exports:[CartItemRepository,GetCartItemService, AddItemCartService]
})
export class CartItemModule{}