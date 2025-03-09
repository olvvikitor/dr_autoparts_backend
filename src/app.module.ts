import { Global, Module } from '@nestjs/common';
import { ProductModule } from './modules/products/products.module';
import { UserModule } from './modules/users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CartModule } from './modules/cart/cart.module';
import { CartItemModule } from './modules/cartItem/cartItem.module';
import AuthModule from './shared/auth/authGuard.module';


@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductModule,
    UserModule,
    CartModule,
    CartItemModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
  exports:[]
})
export class AppModule {}
