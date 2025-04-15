import { Module } from '@nestjs/common';
import { AdminController } from './controllers/admin.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import AuthModule from 'src/shared/auth/authGuard.module';
import MessageModuleProvider from 'src/shared/providers/messages/MessageProviderModule';
import { AdminService } from './services/admin.service';
import { AdminRepository } from './repository/admin.repository';

@Module({
  imports:[PrismaModule,AuthModule, MessageModuleProvider],
  controllers:[AdminController],
  providers:[AdminRepository, AdminService],
})
export class AdminModule{}