import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { Diskprovider } from './DiskStorage';
import { StorageFactory } from './StorageFactory';

@Global()
@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService, diskProvider: Diskprovider) => {
        return new StorageFactory(configService, diskProvider).createStorageProvider().createMulterOptions()
      },
      inject: [ConfigService, Diskprovider]
    }),
  ],

  providers: [
    Diskprovider,
    {
      provide: 'IStorageProvider', useFactory: async (configService: ConfigService, diskProvider: Diskprovider) => {
        return new StorageFactory(configService, diskProvider).createStorageProvider()
      },
      inject: [ConfigService, Diskprovider]
    }
  ],
  exports:['IStorageProvider', Diskprovider, MulterModule]
})
export class StorageModule {}
