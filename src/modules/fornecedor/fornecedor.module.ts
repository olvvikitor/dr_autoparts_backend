import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { FornecedorService } from './services/fornecedor.service';
import { FornecedorController } from './controllers/fornecedor.controller';
import AuthModule from 'src/shared/auth/authGuard.module';


@Module({
  imports: [AuthModule,PrismaModule],
  providers:[FornecedorService],
  controllers:[FornecedorController],    
  exports:[FornecedorService]
  })
export class FornecedorModule{}