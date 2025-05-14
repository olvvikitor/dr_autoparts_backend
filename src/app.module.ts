import { Global, Module } from '@nestjs/common';
import { RegisterUserModule } from './modules/users/register/register.user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import AuthModule from './shared/auth/authGuard.module';
import { AdminModule } from './modules/admin/auth/admin.module';
import { AuthUserModule } from './modules/users/auth/user.module';
import { ProductModule } from './modules/products/products.module';
import { CarrouselModule } from './modules/carrousel/carrousel.module';
import { CartItemModule } from './modules/cartItem/cartItem.module';
import { CartModule } from './modules/cart/cart.module';
import { ThrottlerModule } from '@nestjs/throttler';


@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers:[
        {
          ttl:60000,
          limit:2
        }
      ]
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
