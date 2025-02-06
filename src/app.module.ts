import { Module } from '@nestjs/common';
import { ProductModule } from './modules/products/products.module';
import { UserModule } from './modules/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './modules/cart/cart.module';
import { CartItemModule } from './modules/cartItem/cartItem.module';
import AuthModule from './shared/auth/authGuard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    ProductModule, UserModule, CartModule, CartItemModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
