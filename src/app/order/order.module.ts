import { Module } from '@nestjs/common';
import { MysqlModule } from 'src/shared/mysql/mysql.module';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { RbacModule } from 'src/shared/rbac/rbac.module';
import { OrderItemController } from './order-item/order-item.controller';
import { OrderItemService } from './order-item/order-item.service';
import { OrderReserveFishController } from './order-reserve-fish/order-reserve-fish.controller';
import { OrderReserveFishService } from './order-reserve-fish/order-reserve-fish.service';
import { OrderReserveChickenService } from './order-reserve-chicken/order-reserve-chicken.service';
import { OrderReserveChickenController } from './order-reserve-chicken/order-reserve-chicken.controller';
import { OrderDistSingleItemController } from './order-dist-single-item/order-dist-single-item.controller';
import { OrderDistSingleItemService } from './order-dist-single-item/order-dist-single-item.service';
import { DataOrderService } from '../data/data-order/data-order.service';
import { DataCatalogService } from '../data/data-catalog/data-catalog.service';
import { DataBranchService } from '../data/data-branch/data-branch.service';
import { DataGroupService } from '../data/data-group/data-group.service';
import { DataSupSiryunService } from '../data/data-sup-siryun/data-sup-siryun.service';
import { OrderInternalOrderService } from './order-internal-order/order-internal-order.service';
import { OrderInternalOrderController } from './order-internal-order/order-internal-order.controller';
import { DataInternalOrderService } from '../data/data-internal-order/data-internal-order.service';

@Module({
  imports: [RbacModule, MysqlModule],
  controllers: [OrderItemController, OrderReserveFishController, OrderReserveChickenController, OrderDistSingleItemController, OrderInternalOrderController],
  providers: [AppLogger, OrderItemService, OrderReserveFishService, OrderReserveChickenService, OrderDistSingleItemService, DataOrderService,
    DataCatalogService, DataBranchService, DataGroupService, DataSupSiryunService, OrderInternalOrderService, DataInternalOrderService]
})
export class OrderModule { }
