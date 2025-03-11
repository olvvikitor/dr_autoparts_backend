import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { ModeloService } from './services/modelo.service';
import { ModeloController } from './controllers/modelo.controller';
import AuthModule from 'src/shared/auth/authGuard.module';


@Module({
  imports: [PrismaModule,AuthModule],
  providers:[ModeloService],
  controllers:[ModeloController],    
  exports:[ModeloService]
  })
export class ModeloModule{}