import { Module } from '@nestjs/common';
import { MysqlModule } from 'src/shared/mysql/mysql.module';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { RbacModule } from 'src/shared/rbac/rbac.module';
import { TransferItemController } from './transfer-item/transfer-item.controller';
import { TransferItemService } from './transfer-item/transfer-item.service';


@Module({
  imports: [RbacModule, MysqlModule ],
  controllers: [TransferItemController],
  providers: [AppLogger, TransferItemService]
})
export class TransferModule {}
