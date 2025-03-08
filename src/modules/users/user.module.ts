import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { CreateUserService } from './services/create.user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginUserService } from './services/login.user.service';
import AuthModule from 'src/shared/auth/authGuard.module';
import { LoginController } from './infra/controllers/login.controller';
import { UserController } from './infra/controllers/user.controller';
import { UserRepository } from './infra/repositories/user.repository';

@Module({
  imports: [PrismaModule,AuthModule
  ],
  providers: [UserRepository, CreateUserService, LoginUserService],
  controllers: [UserController, LoginController],
  exports: [UserRepository, CreateUserService]
})
export class UserModule {

}