import { Module } from '@nestjs/common';
import AuthModule from 'src/shared/auth/authGuard.module';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { StorageModule } from 'src/shared/providers/storages/StorageModule';
import { CarrouselRepository } from './repository/carrousel.repository';
import { CarrouselService } from './service/create-carrousel.service';
import { CarrouselController } from './controller/carrousel.controller';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports:[AuthModule, StorageModule, PrismaModule],
  controllers:[CarrouselController],
  providers:[CarrouselRepository, CarrouselService,
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard
    }
    ],
  exports:[CarrouselService]
})
export class CarrouselModule{}