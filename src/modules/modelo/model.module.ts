import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { ModeloService } from './services/modelo.service';
import { ModeloController } from './controllers/modelo.controller';
import AuthModule from 'src/shared/auth/authGuard.module';
import { ModelRepository } from './repository/model.repository';


@Module({
  imports: [PrismaModule,AuthModule],
  controllers:[ModeloController],    
  providers:[ModeloService, ModelRepository],
  exports:[ModeloService, ModelRepository]
  })
export class ModeloModule{}