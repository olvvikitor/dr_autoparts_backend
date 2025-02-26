import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { FornecedorService } from './services/fornecedor.service';
import { FornecedorController } from './controllers/fornecedor.controller';


@Module({
  imports: [PrismaModule],
  providers:[FornecedorService],
  controllers:[FornecedorController],    
  exports:[FornecedorService]
  })
export class CategoryModule{}