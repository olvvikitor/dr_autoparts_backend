import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { CreateUserService } from './services/create.user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginUserService } from './services/login.user.service';
import AuthModule from 'src/shared/auth/authGuard.module';
import { UserController } from './infra/controllers/user.controller';
import { UserRepository } from './infra/repositories/user.repository';
import { AuthController } from './infra/controllers/login.controller';

@Module({
  imports: [PrismaModule,AuthModule
  ],
  controllers: [UserController, AuthController],
  providers: [UserRepository, CreateUserService, LoginUserService],
  exports: [UserRepository, CreateUserService]
})
export class UserModule {

}