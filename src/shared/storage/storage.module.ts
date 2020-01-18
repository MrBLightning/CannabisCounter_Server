import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [StorageService],
  exports: [StorageService]
})
export class StorageModule { }
