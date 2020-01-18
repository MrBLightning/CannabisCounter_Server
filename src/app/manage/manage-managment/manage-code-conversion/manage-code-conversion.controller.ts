import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { ManageCodeConversionService } from './manage-code-conversion.service';
import { CodeConversion } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/codeConversion';
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
export class ManageCodeConversionController {
  @Inject(ManageCodeConversionService) private readonly manageCodeConversionService: ManageCodeConversionService;
  @Inject(AppLogger) private readonly appLogger: AppLogger;

  @Get()
  @Rbac({
    action: ACTION,
    tasks: ["read"],
  })
  async getCodeConversions(@ReqUser() user: AuthUser) {
    return await this.manageCodeConversionService.getCodeConversions(user.netw);
  }

  @Get("/:Code")
  @Rbac({
    action: ACTION,
    tasks: ["read"],
  })
  async getCodeConversionById(@ReqUser() user: AuthUser, @Param('Code') Code: number) {
    return await this.manageCodeConversionService.getCodeConversionById(user.netw, Code);
  }

  @Post()
  @Rbac({
    action: ACTION,
    tasks: ["create"],
  })
  async addCodeConversion(@ReqUser() user: AuthUser, @Body('record') record: CodeConversion) {
    // this.appLogger.log({
    //   record: JSON.stringify(record),
    //   action: "addBranch",
    //   userId: user.id,
    //   branchId: user.branches[0]
    // });
    return await this.manageCodeConversionService.addCodeConversion(user.netw, record);
  }

  @Put("/:Code")
  @Rbac({
    action: ACTION,
    tasks: ["edit"],
  })
  async updateCodeConversion(@ReqUser() user: AuthUser, @Body('record') record: CodeConversion, @Param('Code') Code: number) {
    // this.appLogger.log({
    //   record: JSON.stringify(record),
    //   action: "updateBranch",
    //   userId: user.id,
    //   branchId: user.branches[0]
    // });
    return await this.manageCodeConversionService.updateCodeConversion(user.netw, record, Code);
  }

  @Delete("/:Code")
  @Rbac({
    action: ACTION,
    tasks: ["delete"],
  })
  async deleteCodeConversion(@ReqUser() user: AuthUser, @Param('Code') Code: number) {
    // let record: Branch = await this.manageCodeCoversionService.getBranchById(user.netw, BranchId);
    // this.appLogger.log({
    //   record: JSON.stringify(record),
    //   action: "deleteBranch",
    //   userId: user.id,
    //   branchId: user.branches[0]
    // });
    return await this.manageCodeConversionService.deleteCodeConversion(user.netw, Code);
  }
}
