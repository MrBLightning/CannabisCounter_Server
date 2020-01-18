import { Controller, Inject, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { ManageMigvanBranchService } from './manage-migvan-branch.service';
import { AuthUser } from 'src/shared/auth/auth.types';
import { MigvanBranch } from 'src/shared/types/system.types';
import { AuthGuard } from '@nestjs/passport';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
// import { AppLogger } from 'src/shared/logger/app-logger.service';

const ACTION = 'manage/migvanBranch';

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
export class ManageMigvanBranchController {
  @Inject(ManageMigvanBranchService) private readonly manageMigvanBranchService: ManageMigvanBranchService;
  // @Inject(AppLogger) private readonly appLogger: AppLogger;

  @Get()
  @Rbac({
    action: ACTION,
    tasks: ["read"],
  })
  async getMigvanBranches(@ReqUser() user:AuthUser) {
    return await this.manageMigvanBranchService.getMigvanBranches(user.netw);
  }

  @Get("/:Id")
  @Rbac({
    action: ACTION,
    tasks: ["read"],
  })
  async getMigvanBranchById(@ReqUser() user:AuthUser, @Param('Id') Id: number) {
    return await this.manageMigvanBranchService.getMigvanBranchById(user.netw, Id);
  }

  @Post()
  @Rbac({
    action: ACTION,
    tasks: ["create"],
  })
  async addMigvanBranch(@ReqUser() user:AuthUser, @Body('record') record: MigvanBranch) {
    // this.appLogger.log({
    //   record: JSON.stringify(record),
    //   action: "addMigvanBranch",
    //   userId: user.id,
    //   branchId: user.branches[0]
    // });
    return await this.manageMigvanBranchService.addMigvanBranch(user.netw, record);
  }

  @Put("/:Id")
  @Rbac({
    action: ACTION,
    tasks: ["edit"],
  })
  async updateBranch(@ReqUser() user:AuthUser, @Body('record') record: MigvanBranch, @Param('Id') Id: number) {
    // this.appLogger.log({
    //   record: JSON.stringify(record),
    //   action: "updateMigvanBranch",
    //   userId: user.id,
    //   branchId: user.branches[0]
    // });
    return await this.manageMigvanBranchService.updateMigvanBranch(user.netw, record, Id);
  }

  @Delete("/:Id")
  @Rbac({
    action: ACTION,
    tasks: ["delete"],
  })
  async deleteBranch(@ReqUser() user:AuthUser, @Param('Id') Id: number) {
    // let record: MigvanBranch = await this.manageMigvanBranchService.getMigvanBranchById(user.netw, Id);
    // this.appLogger.log({
    //   record: JSON.stringify(record),
    //   action: "deleteMigvanBranch",
    //   userId: user.id,
    //   branchId: user.branches[0]
    // });
    return await this.manageMigvanBranchService.deleteMigvanBranch(user.netw, Id);
  }
}

