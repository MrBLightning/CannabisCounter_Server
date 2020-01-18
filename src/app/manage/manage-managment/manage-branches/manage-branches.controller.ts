import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { ManageBranchesService } from './manage-branches.service';
import { Branch } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/branch';
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
export class ManageBranchesController {
  @Inject(ManageBranchesService) private readonly manageBranchesService: ManageBranchesService;
  @Inject(AppLogger) private readonly appLogger: AppLogger;

  @Get()
  @Rbac({
    action: ACTION,
    tasks: ["read"],
  })
  async getBranches(@ReqUser() user: AuthUser) {
    return await this.manageBranchesService.getBranches(user.netw);
  }
  @Get("/:BranchId")
  @Rbac({
    action: ACTION,
    tasks: ["read"],
  })
  async getBranchById(@ReqUser() user: AuthUser, @Param('BranchId') BranchId: number) {
    return await this.manageBranchesService.getBranchById(user.netw, BranchId);
  }
  @Post()
  @Rbac({
    action: ACTION,
    tasks: ["create"],
  })
  async addBranch(@ReqUser() user: AuthUser, @Body('record') record: Branch) {
    this.appLogger.log({
      record: JSON.stringify(record),
      action: "addBranch",
      userId: user.id,
      branchId: user.branches[0]
    });
    return await this.manageBranchesService.addBranch(user.netw, record);
  }
  @Put("/:BranchId")
  @Rbac({
    action: ACTION,
    tasks: ["edit"],
  })
  async updateBranch(@ReqUser() user: AuthUser, @Body('record') record: Branch, @Param('BranchId') BranchId: number) {
    this.appLogger.log({
      record: JSON.stringify(record),
      action: "updateBranch",
      userId: user.id,
      branchId: user.branches[0]
    });
    return await this.manageBranchesService.updateBranch(user.netw, record, BranchId);
  }
  @Delete("/:BranchId")
  @Rbac({
    action: ACTION,
    tasks: ["delete"],
  })
  async deleteBranch(@ReqUser() user: AuthUser, @Param('BranchId') BranchId: number) {
    let record: Branch = await this.manageBranchesService.getBranchById(user.netw, BranchId);
    this.appLogger.log({
      record: JSON.stringify(record),
      action: "deleteBranch",
      userId: user.id,
      branchId: user.branches[0]
    });
    return await this.manageBranchesService.deleteBranch(user.netw, BranchId);
  }
}
