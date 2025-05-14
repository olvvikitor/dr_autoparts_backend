import { forwardRef, Module } from '@nestjs/common';
import { CartRepository } from './repositories/cart.repository';
import { CartController } from './controller/cart.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { CartItemModule } from '../cartItem/cartItem.module';

@Module({
  imports:[PrismaModule,forwardRef(()=>CartItemModule) ],
  providers:[CartRepository],
  controllers:[CartController],
  exports:[CartRepository]
})
export class CartModule{}