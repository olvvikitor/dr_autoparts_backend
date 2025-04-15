import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { CreateUserService } from './services/create.user.service';
import AuthModule from 'src/shared/auth/authGuard.module';
import { UserController } from './infra/controllers/user.controller';
import { UserRepository } from './infra/repositories/user.repository';

@Module({
  imports: [PrismaModule,AuthModule
  ],
  controllers: [UserController],
  providers: [UserRepository, CreateUserService],
  exports: [UserRepository, CreateUserService]
})
export class RegisterUserModule {

}