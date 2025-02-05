import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { CartItemRepository } from './repositories/cartItem.repository';

@Module({
  imports:[PrismaModule],
  providers:[CartItemRepository],
  exports:[CartItemRepository]
})
export class CartItemModule{}