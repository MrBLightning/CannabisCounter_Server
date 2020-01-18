import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { ManageSubbargeneralService } from './manage-subbargeneral.service';
import { Subbar } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/subbargeneral';
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
export class ManageSubbargeneralController {
  @Inject(ManageSubbargeneralService) private readonly manageSubbargeneralService: ManageSubbargeneralService;
  // @Inject(AppLogger) private readonly appLogger: AppLogger;

  @Get()
  @Rbac({
    action: ACTION,
    tasks: ["read"],
  })
  async getSubbars(@ReqUser() user: AuthUser) {
    return await this.manageSubbargeneralService.getSubbars();
  }
  @Get("/:Id")
  @Rbac({
    action: ACTION,
    tasks: ["read"],
  })
  async getSubbarById(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
    return await this.manageSubbargeneralService.getSubbarById(Id);
  }
  @Post()
  @Rbac({
    action: ACTION,
    tasks: ["create"],
  })
  async addSubbar(@ReqUser() user: AuthUser, @Body('record') record: Subbar) {
    return await this.manageSubbargeneralService.addSubbar(record);
  }
  @Put("/:Id")
  @Rbac({
    action: ACTION,
    tasks: ["edit"],
  })
  async updateSubbar(@ReqUser() user: AuthUser, @Body('record') record: Subbar, @Param('Id') Id: number) {
    return await this.manageSubbargeneralService.updateSubbar(record, Id);
  }
  @Delete("/:Id")
  @Rbac({
    action: ACTION,
    tasks: ["delete"],
  })
  async deleteSubbar(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
    return await this.manageSubbargeneralService.deleteSubbar(Id);
  }
}



