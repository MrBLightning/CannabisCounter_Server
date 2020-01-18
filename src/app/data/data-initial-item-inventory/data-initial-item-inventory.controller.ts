import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataCatalogService } from '../data-catalog/data-catalog.service';
import { DataUnitSizeService } from '../data-unit-size/data-unit-size.service';
import { DataDepartmentService } from '../data-department/data-department.service';
import { DataGroupService } from '../data-group/data-group.service';
import { DataMigvanBranchService } from '../data-migvan-branch/data-migvan-branch.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';
import { CatalogItem, UnitSize, Department, Group, LinkedGroup, MigvanBranch, InitialOrderInventory } from 'src/shared/types/system.types';

@Controller('data/initialItemInventory')
@UseGuards(AuthGuard('jwt'))
export class DataInitialItemInventoryController {
    @Inject(DataCatalogService) private readonly dataCatalogService: DataCatalogService;
    @Inject(DataUnitSizeService) private readonly dataUnitSizeService: DataUnitSizeService;
    @Inject(DataDepartmentService) private readonly dataDepartmentService: DataDepartmentService;
    @Inject(DataGroupService) private readonly dataGroupService: DataGroupService;
    @Inject(DataMigvanBranchService) private readonly dataMigvanBranchService: DataMigvanBranchService;

    @Get("/:BranchId")
    async getInitialItemTransfer(@ReqUser() user: AuthUser, @Param('BranchId') BranchId: number) {
        let snifItem:InitialOrderInventory = {
            BarCode: 0,
            BarCodeName: '',
            UnitId: 0,
            UnitName: '',
            DepartmentId: 0,
            DepartmentName: '',
            GroupId: 0,
            GroupName: '',
            OrderedAmount: 0
        };
        let snifItems:InitialOrderInventory[] = [];
        let migvans: MigvanBranch[] = await this.dataMigvanBranchService.getMigvanBranchById(user.netw, BranchId);
        let catalogs = await this.dataCatalogService.getCatalogItems(user.netw);
        // create unique list of linked group <-> department (class)
        const array = catalogs;
        const linkedGroups: LinkedGroup[] = [];
        const map = new Map();
        for (const item of array) {
            let key = item.GroupId + "#" + item.ClassesId;
            if (!map.has(key)) {
                map.set(key, true);    // set Map by GroupId + ClassesId value
                linkedGroups.push({
                    Id: item.GroupId,
                    DeptId: item.ClassesId
                });
            }
        }
        // get the rest of the data
        let units = await this.dataUnitSizeService.getUnitSizes();
        let departments = await this.dataDepartmentService.getDepartments(user.netw);;
        let groups = await this.dataGroupService.getGroups(user.netw);
        let catalog: CatalogItem;
        let unit: UnitSize;
        let group: Group;
        let department: Department;
        let linkedGroup: LinkedGroup;
        migvans.map((item, i) => {
            catalog = catalogs.filter(catalog => catalog.BarCode === item.BarCode)[0];
            unit = units.filter(unit => unit.Id === parseInt(catalog.UnitAriza))[0];
            group = groups.filter(group => group.Id === catalog.GroupId)[0];
            linkedGroup = linkedGroups.filter(linkedGroup => linkedGroup.Id === catalog.GroupId)[0];
            // when there is a connection between group and department in the group table
            department = departments.filter(department => department.Id === group.ClassId)[0];
            // when there is NO connection between group and department in the group table
            //department = departments.filter(department => department.Id === linkedGroup.DeptId)[0];
            snifItem = {
                BarCode: item.BarCode,
                BarCodeName: catalog.Name,
                UnitId: parseInt(catalog.UnitAriza),
                UnitName: unit.Name,
                DepartmentId: department.Id,
                DepartmentName: department.Name,
                GroupId: catalog.GroupId,
                GroupName: group.Name,
                OrderedAmount: 0
            };
            snifItems.push(snifItem);
        });
        return snifItems;
    }
}
