import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { UserRepository } from './repositories/user.repository';
import { CreateUserService } from './services/create.user.service';
import { UserController } from './controllers/user.controller';

@Module({
  imports:[PrismaModule],
  providers:[UserRepository, CreateUserService],
  controllers:[UserController],
  exports:[UserRepository, CreateUserService]
})
export class UserModule{
  
}