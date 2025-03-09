import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Diskprovider } from './DiskStorage';
import { S3StorageProvider } from './S3Storage';


@Injectable()
export class StorageFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly diskProvider: Diskprovider,
    private readonly s3Storage: S3StorageProvider
  ) {}

  createStorageProvider() {
    const type = this.configService.get('ENVIRONMENT');
    if (type === 'dev') {
      return this.diskProvider;
    }
    return this.s3Storage
  }
}