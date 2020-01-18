import { Module } from '@nestjs/common';
import { MysqlModule } from 'src/shared/mysql/mysql.module';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { ManageSapakimController } from './manage-sapakim/manage-sapakim.controller';
import { ManageSapakimService } from './manage-sapakim/manage-sapakim.service';
import { ManageSubsapakService } from './manage-subsapak/manage-subsapak.service';
import { ManageSubsapakController } from './manage-subsapak/manage-subsapak.controller';
import { ManageBranchesService } from './manage-branches/manage-branches.service';
import { ManageBranchesController } from './manage-branches/manage-branches.controller';
import { RbacModule } from 'src/shared/rbac/rbac.module';
import { ManageAspakaController } from './manage-aspaka/manage-aspaka.controller';
import { ManageAspakaService } from './manage-aspaka/manage-aspaka.service';
import { ManageSupsiryunController } from './manage-supsiryun/manage-supsiryun.controller';
import { ManageSupsiryunService } from './manage-supsiryun/manage-supsiryun.service';
import { ManageDordersService } from './manage-dorders/manage-dorders.service';
import { ManageDordersController } from './manage-dorders/manage-dorders.controller';
import { ManageSibasService } from './manage-sibas/manage-sibas.service';
import { ManageSibasController } from './manage-sibas/manage-sibas.controller';
import { ManageCodeConversionController } from './manage-code-conversion/manage-code-conversion.controller';
import { ManageCodeConversionService } from './manage-code-conversion/manage-code-conversion.service';
import { ManageBranchNetworkController } from './manage-branch-network/manage-branch-network.controller';
import { ManageBranchNetworkService } from './manage-branch-network/manage-branch-network.service';
import { ManageUnitSizeService } from './manage-unit-size/manage-unit-size.service';
import { ManageUnitSizeController } from './manage-unit-size/manage-unit-size.controller';
import { ManageSiryunService } from './manage-siryun/manage-siryun.service';
import { ManageSiryunController } from './manage-siryun/manage-siryun.controller';
import { ManageSingleSupplierItemController } from './manage-single-supplier-item/manage-single-supplier-item.controller';
import { ManageSingleSupplierItemService } from './manage-single-supplier-item/manage-single-supplier-item.service';

@Module({
  imports: [RbacModule, MysqlModule ],
  controllers: [ManageSapakimController, ManageSubsapakController, ManageBranchesController, ManageAspakaController, ManageSupsiryunController, ManageDordersController, ManageSibasController, ManageCodeConversionController, ManageBranchNetworkController, ManageUnitSizeController, ManageSiryunController, ManageSingleSupplierItemController],
  providers: [AppLogger, ManageSapakimService, ManageSubsapakService, ManageBranchesService, ManageAspakaService, ManageSupsiryunService, ManageDordersService, ManageSibasService, ManageCodeConversionService, ManageBranchNetworkService, ManageUnitSizeService, ManageSiryunService, ManageSingleSupplierItemService]
})
export class ManageManagmentModule {}
