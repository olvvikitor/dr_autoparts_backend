import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';

import { LoginUserService } from './services/login.user.service';
import AuthModule from 'src/shared/auth/authGuard.module';
import { UserRepository } from './infra/repositories/user.repository';
import { AuthController } from './infra/controllers/login.controller';

@Module({
  imports: [PrismaModule,AuthModule
  ],
  controllers: [AuthController],
  providers: [UserRepository, LoginUserService],
  exports: [UserRepository]
})
export class AuthUserModule {

}