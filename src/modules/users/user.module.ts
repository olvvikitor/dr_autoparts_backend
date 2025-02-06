import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { UserRepository } from './repositories/user.repository';
import { CreateUserService } from './services/create.user.service';
import { UserController } from './controllers/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginUserService } from './services/login.user.service';
import { LoginController } from './controllers/login.controller';
import AuthModule from 'src/shared/auth/authGuard.module';

@Module({
  imports: [PrismaModule,AuthModule
  ],
  providers: [UserRepository, CreateUserService, LoginUserService],
  controllers: [UserController, LoginController],
  exports: [UserRepository, CreateUserService]
})
export class UserModule {

}