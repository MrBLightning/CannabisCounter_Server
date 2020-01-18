import { Module } from '@nestjs/common';
import { MysqlService } from './mysql.service';
import { ConfigModule } from '../config/config.module';
import { MysqlConnection, MysqlBaseConnection, 
  MYSQL_CONNECTION, 
  MYSQL_BASE_CONNECTION } from './mysql.provider';

@Module({
  imports: [ConfigModule],
  providers: [MysqlService, MysqlConnection, MysqlBaseConnection],
  exports: [MysqlService, 
    MYSQL_CONNECTION, 
    MYSQL_BASE_CONNECTION]
})
export class MysqlModule { }
