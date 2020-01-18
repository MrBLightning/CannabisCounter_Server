import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { ManageSiryunService } from './manage-siryun.service';
import { Siryun, SiryunWhere, SiryunUpdate } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/siryun';
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
export class ManageSiryunController {
  @Inject(ManageSiryunService) private readonly manageSiryunService: ManageSiryunService;
//   @Inject(AppLogger) private readonly appLogger: AppLogger;

  @Get()
  @Rbac({
    action: ACTION,
    tasks: ["read"],
  })
  async getSiryuns(@ReqUser() user: AuthUser) {
    return await this.manageSiryunService.getSiryuns(user.netw);
  }

//   @Get("/:Id")
//   @Rbac({
//     action: ACTION,
//     tasks: ["read"],
//   })
//   async getSiryunById(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
//     return await this.manageSiryunService.getSiryunById(user.netw, Id);
//   }

  @Get("/:CreateDate")
  @Rbac({
    action: ACTION,
    tasks: ["read"],
  })
  async getSiryunByDate(@ReqUser() user: AuthUser, @Param('CreateDate') CreateDate: string) {
    return await this.manageSiryunService.getSiryunByDate(user.netw, CreateDate);
  }

  @Post()
  @Rbac({
    action: ACTION,
    tasks: ["create"],
  })
  async addSiryun(@ReqUser() user: AuthUser, @Body('record') record: Siryun) {
    // this.appLogger.log({
    //   record: JSON.stringify(record),
    //   action: "addBranch",
    //   userId: user.id,
    //   branchId: user.branches[0]
    // });
    return await this.manageSiryunService.addSiryun(user.netw, record);
  }

  @Put()
  @Rbac({
    action: ACTION,
    tasks: ["edit"],
  })
  async updateSiryun(@ReqUser() user: AuthUser, @Body('record') record: SiryunUpdate, @Body('recordWhere') recordWhere: SiryunWhere) {
    // this.appLogger.log({
    //   record: JSON.stringify(record),
    //   action: "updateBranch",
    //   userId: user.id,
    //   branchId: user.branches[0]
    // });
    return await this.manageSiryunService.updateSiryun(user.netw, recordWhere, record);
  }

  @Delete("/:Id")
  @Rbac({
    action: ACTION,
    tasks: ["delete"],
  })
  async deleteSiryun(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
    // let record: Branch = await this.manageBranchesService.getBranchById(user.netw, BranchId);
    // this.appLogger.log({
    //   record: JSON.stringify(record),
    //   action: "deleteBranch",
    //   userId: user.id,
    //   branchId: user.branches[0]
    // });
    return await this.manageSiryunService.deleteSiryun(user.netw, Id);
  }
}
