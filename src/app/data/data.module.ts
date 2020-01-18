import { Module } from '@nestjs/common';
import { MysqlModule } from 'src/shared/mysql/mysql.module';
import { DataDepartmentService } from './data-department/data-department.service';
import { DataDepartmentController } from './data-department/data-department.controller';
import { DataGroupController } from './data-group/data-group.controller';
import { DataGroupService } from './data-group/data-group.service';
import { DataSubgroupService } from './data-subgroup/data-subgroup.service';
import { DataSubgroupController } from './data-subgroup/data-subgroup.controller';
import { DataDegemController } from './data-degem/data-degem.controller';
import { DataDegemService } from './data-degem/data-degem.service';
import { DataSapakService } from './data-sapak/data-sapak.service';
import { DataSapakController } from './data-sapak/data-sapak.controller';
import { DataRbacController } from './data-rbac/data-rbac.controller';
import { DataRbacService } from './data-rbac/data-rbac.service';
import { RbacModule } from 'src/shared/rbac/rbac.module';
import { ConfigModule } from 'src/shared/config/config.module';
import { DataUnitSizeService } from './data-unit-size/data-unit-size.service';
import { DataUnitSizeController } from './data-unit-size/data-unit-size.controller';
import { DataBranchTypeController } from './data-branch-type/data-branch-type.controller';
import { DataBranchTypeService } from './data-branch-type/data-branch-type.service';
import { DataBranchService } from './data-branch/data-branch.service';
import { DataBranchController } from './data-branch/data-branch.controller';
import { DataCatalogController } from './data-catalog/data-catalog.controller';
import { DataCatalogService } from './data-catalog/data-catalog.service';
import { DataScrmenuController } from './data-scrmenu/data-scrmenu.controller';
import { DataScrmenuService } from './data-scrmenu/data-scrmenu.service';
import { DataSibaresService } from './data-sibares/data-sibares.service';
import { DataSibaresController } from './data-sibares/data-sibares.controller';
import { DataInitialOrderInventoryController } from './data-initial-order-inventory/data-initial-order-inventory.controller';
import { DataInitialOrderInventoryService } from './data-initial-order-inventory/data-initial-order-inventory.service';
import { DataMigvanBranchService } from './data-migvan-branch/data-migvan-branch.service';
import { DataMigvanBranchController } from './data-migvan-branch/data-migvan-branch.controller';
import { DataCountersController } from './data-counters/data-counters.controller';
import { DataCountersService } from './data-counters/data-counters.service';
import { DataSibaService } from './data-siba/data-siba.service';
import { DataSibaController } from './data-siba/data-siba.controller';
import { DataInitialItemTransferController } from './data-initial-item-transfer/data-initial-item-transfer.controller';
import { DataInitialItemTransferService } from './data-initial-item-transfer/data-initial-item-transfer.service';
import { DataOrderService } from './data-order/data-order.service';
import { DataOrderController } from './data-order/data-order.controller';
import { DataInitialItemInventoryService } from './data-initial-item-inventory/data-initial-item-inventory.service';
import { DataInitialItemInventoryController } from './data-initial-item-inventory/data-initial-item-inventory.controller';
import { DataInitialItemToConvertController } from './data-initial-item-to-convert/data-initial-item-to-convert.controller';
import { DataInitialItemToConvertService } from './data-initial-item-to-convert/data-initial-item-to-convert.service';
import { DataInitialItemToDestroyService } from './data-initial-item-to-destroy/data-initial-item-to-destroy.service';
import { DataInitialItemToDestroyController } from './data-initial-item-to-destroy/data-initial-item-to-destroy.controller';
import { DataUserService } from './data-user/data-user.service';
import { DataUserController } from './data-user/data-user.controller';
import { DataBranchNetworkController } from './data-branch-network/data-branch-network.controller';
import { DataBranchNetworkService } from './data-branch-network/data-branch-network.service';
import { DataSupSiryunService } from './data-sup-siryun/data-sup-siryun.service';
import { DataSupSiryunController } from './data-sup-siryun/data-sup-siryun.controller';
import { DataInternalOrderController } from './data-internal-order/data-internal-order.controller';
import { DataInternalOrderService } from './data-internal-order/data-internal-order.service';
import { DataSingleSupplierItemService } from './data-single-supplier-item/data-single-supplier-item.service';
import { DataSingleSupplierItemController } from './data-single-supplier-item/data-single-supplier-item.controller';
import { DataSubtitleController } from './data-subtitle/data-subtitle.controller';
import { DataSubtitleService } from './data-subtitle/data-subtitle.service'
import { DataYedController } from './data-yed/data-yed.controller';
import { DataYedService } from './data-yed/data-yed.service';
import { DataYedmivController } from './data-yedmiv/data-yedmiv.controller';
import { DataYedmivService } from './data-yedmiv/data-yedmiv.service';
import { DataYedtzController } from './data-yedtz/data-yedtz.controller';
import { DataYedtzService } from './data-yedtz/data-yedtz.service'
import { DataYedionController } from './data-yedion/data-yedion.controller';
import { DataYedionService } from './data-yedion/data-yedion.service'
import { DataDestructionWController } from './data-destructionW/data-destructionW.controller';
import  {DataDestructionWService} from './data-destructionW/data-destructionW.service';
@Module({
    imports: [MysqlModule, RbacModule, ConfigModule],
    controllers: [ 
        DataDepartmentController, 
        DataGroupController, 
        DataSubgroupController, 
        DataDegemController, 
        DataSapakController, 
        DataRbacController, 
        DataUnitSizeController, 
        DataBranchTypeController, 
        DataBranchController, 
        DataCatalogController, 
        DataScrmenuController, 
        DataSibaresController, 
        DataInitialOrderInventoryController, 
        DataMigvanBranchController, 
        DataCountersController, 
        DataSibaController, 
        DataInitialItemTransferController, 
        DataOrderController, 
        DataInitialItemInventoryController, 
        DataInitialItemToConvertController, 
        DataInitialItemToDestroyController, 
        DataUserController, 
        DataBranchNetworkController, 
        DataSupSiryunController, 
        DataInternalOrderController, 
        DataSingleSupplierItemController, 
        DataSubtitleController,
        DataYedController,
        DataYedmivController,
        DataYedtzController,
        DataYedionController,
        DataDestructionWController
    ],
    providers: [
        DataDepartmentService, 
        DataGroupService, 
        DataSubgroupService, 
        DataDegemService, 
        DataSapakService, 
        DataRbacService, 
        DataUnitSizeService, 
        DataBranchTypeService, 
        DataBranchService, 
        DataCatalogService, 
        DataScrmenuService, 
        DataSibaresService, 
        DataInitialOrderInventoryService, 
        DataMigvanBranchService, 
        DataCountersService, 
        DataSibaService, 
        DataInitialItemTransferService, 
        DataOrderService, 
        DataInitialItemInventoryService, 
        DataInitialItemToConvertService, 
        DataInitialItemToDestroyService, 
        DataUserService, 
        DataBranchNetworkService, 
        DataSupSiryunService, 
        DataInternalOrderService, 
        DataSingleSupplierItemService,
        DataSubtitleService,
        DataYedService,
        DataYedmivService,
        DataYedtzService,
        DataYedionService,
        DataDestructionWService
    ],
})
export class DataModule {

}
