import { Global, Module } from '@nestjs/common';
import { RegisterUserModule } from './modules/users/register/register.user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import AuthModule from './shared/auth/authGuard.module';
import { AdminModule } from './modules/admin/auth/admin.module';
import { ProductModule } from './modules/admin/products/products.module';
import { AuthUserModule } from './modules/users/auth/user.module';
import { CartItemModule } from './modules/users/cartItem/cartItem.module';
import { CartModule } from './modules/users/cart/cart.module';
import { CarrouselModule } from './modules/admin/carrousel/carrousel.module';


@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductModule,
    RegisterUserModule,
    AuthUserModule,
    CartModule,
    CartItemModule,
    AdminModule,
    AuthModule,
    CarrouselModule
  ],
  controllers: [],
  providers: [],
  exports:[]
})
export class AppModule {}
