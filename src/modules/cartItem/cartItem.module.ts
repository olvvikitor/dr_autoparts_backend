import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { CartItemRepository } from './repositories/cartItem.repository';
import { GetCartItemService } from './services/get-cartItem.service';
import { CartModule } from '../cart/cart.module';
import { CartItemController } from './controller/cartItem.controller';

@Module({
  imports:[PrismaModule, forwardRef(()=>CartModule)],
  providers:[CartItemRepository,GetCartItemService],
  controllers:[CartItemController],
  exports:[CartItemRepository,GetCartItemService]
})
export class CartItemModule{}