import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Diskprovider } from './DiskStorage';


@Injectable()
export class StorageFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly diskProvider: Diskprovider,
  ) {}

  createStorageProvider() {
    const type = this.configService.get('ENVIRONMENT');
    if (type === 'dev') {
      return this.diskProvider;
    }
    return null
  }
}