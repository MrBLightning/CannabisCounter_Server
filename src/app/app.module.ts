import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { ConfigModule } from '../shared/config/config.module';
import { MysqlModule } from '../shared/mysql/mysql.module';
import { LoggerModule } from '../shared/logger/logger.module';
import { AuthModule } from '../shared/auth/auth.module';
import { UserModule } from '../shared/user/user.module';
import { RbacModule } from 'src/shared/rbac/rbac.module';
import { ManageModule } from './manage/manage.module';
import { CorsMiddleware } from 'src/shared/lib/cors.middleware';
import { HttpExceptionFilter } from 'src/shared/lib/http-exception.filter';
import { AuthController } from './auth/auth.controller';
import { DataModule } from './data/data.module';
import { PlanogramModule } from './planogram/planogram.module';
import { StorageModule } from 'src/shared/storage/storage.module';
import { OrderModule } from './order/order.module';
import { TransferItemController } from './transfer/transfer-item/transfer-item.controller';
import { TransferItemService } from './transfer/transfer-item/transfer-item.service';
import { ConfigModule as ConfigureNest} from '@nestjs/config';


@Module({
  imports: [
    LoggerModule,
    ConfigModule,
    // set nest to ignore .env files
    ConfigureNest.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    MysqlModule,
    UserModule,
    AuthModule,
    StorageModule,
    RbacModule,
    ManageModule,
    DataModule,
    PlanogramModule,
    OrderModule
  ],
  controllers: [AppController, AuthController, TransferItemController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    TransferItemService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        CorsMiddleware).forRoutes("*");
  }
}
