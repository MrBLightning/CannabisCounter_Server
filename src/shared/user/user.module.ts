import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MysqlModule } from '../mysql/mysql.module';

@Module({
  imports: [MysqlModule],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
