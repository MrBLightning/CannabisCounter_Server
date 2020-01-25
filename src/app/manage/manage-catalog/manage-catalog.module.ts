import { Module } from '@nestjs/common';
import { ManageDepartmentController } from './manage-department/manage-department.controller';
import { ManageDepartmentService } from './manage-department/manage-department.service';
import { MysqlModule } from 'src/shared/mysql/mysql.module';
import { ManageGroupController } from './manage-group/manage-group.controller';
import { ManageGroupService } from './manage-group/manage-group.service';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { ManageDegemController } from './manage-degem/manage-degem.controller';
import { ManageDegemService } from './manage-degem/manage-degem.service';
import { ManageSubgroupService } from './manage-subgroup/manage-subgroup.service';
import { ManageSubgroupController } from './manage-subgroup/manage-subgroup.controller';
import { ManageItemController } from './manage-item/manage-item.controller';
import { ManageItemService } from './manage-item/manage-item.service';
import { RbacModule } from 'src/shared/rbac/rbac.module';
import { ManageMigvanBranchController } from './manage-migvan-branch/manage-migvan-branch.controller';
import { ManageMigvanBranchService } from './manage-migvan-branch/manage-migvan-branch.service';
import { ManageMigvanSapakService } from './manage-migvan-sapak/manage-migvan-sapak.service';
import { ManageMigvanSapakController } from './manage-migvan-sapak/manage-migvan-sapak.controller';
import { ManagePerukController } from './manage-peruk/manage-peruk.controller';
import { ManagePerukService } from './manage-peruk/manage-peruk.service';
import { ManageSubbarController } from './manage-subbar/manage-subbar.controller';
import { ManageSubbarService } from './manage-subbar/manage-subbar.service';
import { ManageSubbargeneralService } from './manage-subbargeneral/manage-subbargeneral.service';
import { ManageSubbargeneralController } from './manage-subbargeneral/manage-subbargeneral.controller';
import { ManageInventoryService } from './manage-inventory/manage-inventory.service';
import { ManageInventoryController } from './manage-inventory/manage-inventory.controller';
import { ManageDestructionController } from './manage-destruction/manage-destruction.controller';
import { ManageDestructionService } from './manage-destruction/manage-destruction.service';
import { ManageDeconstructService } from './manage-deconstruct/manage-deconstruct.service';
import { ManageDeconstructController } from './manage-deconstruct/manage-deconstruct.controller';
import { ManageConversionController } from './manage-conversion/manage-conversion.controller';
import { ManageConversionService } from './manage-conversion/manage-conversion.service';
import { ManageDeconstructionService } from './manage-deconstruction/manage-deconstruction.service';
import { ManageDeconstructionController } from './manage-deconstruction/manage-deconstruction.controller';
import { ManageLocationController } from './manage-location/manage-location.controller';
import { ManageLocationService } from './manage-location/manage-location.service';
import { ManagePharmacyController } from './manage-pharmacy/manage-pharmacy.controller';
import { ManagePharmacyService } from './manage-pharmacy/manage-pharmacy.service';
import { ManageSuppliersController } from './manage-suppliers/manage-suppliers.controller';
import { ManageSuppliersService } from './manage-suppliers/manage-suppliers.service';
import { ManageCategoryController } from './manage-category/manage-category.controller';
import { ManageCategoryService } from './manage-category/manage-category.service';

@Module({
  imports: [RbacModule, MysqlModule ],
  controllers: [
    ManageDepartmentController, 
    ManageMigvanBranchController, 
    ManageGroupController, 
    ManageDegemController, 
    ManageSubgroupController, 
    ManageItemController, 
    ManageMigvanSapakController, 
    ManagePerukController, 
    ManageSubbarController, 
    ManageSubbargeneralController, ManageInventoryController, ManageDestructionController, 
    ManageDeconstructController, ManageConversionController, ManageDeconstructionController,
    ManageLocationController,
    ManagePharmacyController,
    ManageSuppliersController,
    ManageCategoryController],
  providers: [
    ManageDepartmentService, 
    ManageMigvanBranchService, 
    ManageGroupService, 
    AppLogger, 
    ManageDegemService, 
    ManageSubgroupService, 
    ManageItemService, 
    ManageMigvanSapakService, 
    ManagePerukService, 
    ManageSubbarService, 
    ManageSubbargeneralService, ManageInventoryService, ManageDestructionService, 
    ManageDeconstructService, ManageConversionService, ManageDeconstructionService,
    ManageLocationService,
    ManagePharmacyService,
    ManageSuppliersService,
    ManageCategoryService]
})
export class ManageCatalogModule {}
