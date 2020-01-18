import { Module } from '@nestjs/common';
import { RbacService } from './rbac.service';
import { MysqlModule } from 'src/shared/mysql/mysql.module';
import { ConfigModule } from '../config/config.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ConfigModule, MysqlModule, AuthModule],
  providers: [RbacService],
  exports: [RbacService]
})
export class RbacModule {}
