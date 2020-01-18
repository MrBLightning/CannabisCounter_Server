import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { ManageSingleSupplierItemService } from './manage-single-supplier-item.service';
import { SingleSupplierItem } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/singleSupplierItem';
@Controller(ACTION)
@UseGuards(AuthGuard('jwt'))
@Rbac({
  action: ACTION,
  permissions: [
    BASE_ROLE.MANAGER,
    {
      role: BASE_ROLE.USER,
      tasks: ["read", "create", "edit", "delete"]
    }
  ]
})
export class ManageSingleSupplierItemController {
  @Inject(ManageSingleSupplierItemService) private readonly manageSingleSupplierItemService: ManageSingleSupplierItemService;
  @Inject(AppLogger) private readonly appLogger: AppLogger;

  @Get()
  @Rbac({
    action: ACTION,
    tasks: ["read"],
  })
  async getSingleSupplierItems(@ReqUser() user: AuthUser) {
    return await this.manageSingleSupplierItemService.getSingleSupplierItems(user.netw);
  }
  @Get("/:Id")
  @Rbac({
    action: ACTION,
    tasks: ["read"],
  })
  async getSingleSupplierItemById(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
    return await this.manageSingleSupplierItemService.getSingleSupplierItemById(user.netw, Id);
  }
  @Post()
  @Rbac({
    action: ACTION,
    tasks: ["create"],
  })
  async addSingleSupplierItem(@ReqUser() user: AuthUser, @Body('record') record: SingleSupplierItem) {
    // this.appLogger.log({
    //   record: JSON.stringify(record),
    //   action: "addBranch",
    //   userId: user.id,
    //   branchId: user.branches[0]
    // });
    return await this.manageSingleSupplierItemService.addSingleSupplierItem(user.netw, record);
  }
  @Put("/:Id")
  @Rbac({
    action: ACTION,
    tasks: ["edit"],
  })
  async updateSingleSupplierItem(@ReqUser() user: AuthUser, @Body('record') record: SingleSupplierItem, @Param('Id') Id: number) {
    // this.appLogger.log({
    //   record: JSON.stringify(record),
    //   action: "updateBranch",
    //   userId: user.id,
    //   branchId: user.branches[0]
    // });
    return await this.manageSingleSupplierItemService.updateSingleSupplierItem(user.netw, record, Id);
  }
  @Delete("/:Id")
  @Rbac({
    action: ACTION,
    tasks: ["delete"],
  })
  async deleteSingleSupplierItem(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
    // let record: Branch = await this.manageBranchesService.getBranchById(user.netw, BranchId);
    // this.appLogger.log({
    //   record: JSON.stringify(record),
    //   action: "deleteBranch",
    //   userId: user.id,
    //   branchId: user.branches[0]
    // });
    return await this.manageSingleSupplierItemService.deleteSingleSupplierItem(user.netw, Id);
  }
}
