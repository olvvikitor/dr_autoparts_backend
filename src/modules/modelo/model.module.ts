import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { ModeloService } from './services/modelo.service';
import { ModeloController } from './controllers/modelo.controller';


@Module({
  imports: [PrismaModule],
  providers:[ModeloService],
  controllers:[ModeloController],    
  exports:[ModeloService]
  })
export class CategoryModule{}