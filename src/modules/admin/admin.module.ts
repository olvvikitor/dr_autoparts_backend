import { Module } from '@nestjs/common';
import { AdminController } from './auth/admin.controller';
import { AdminRepository } from './repository/admin.repository';
import { AdminService } from './auth/admin.service';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import AuthModule from 'src/shared/auth/authGuard.module';

@Module({
  imports:[PrismaModule,AuthModule],
  controllers:[AdminController],
  providers:[AdminRepository, AdminService],
})
export class AdminModule{}