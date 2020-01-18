import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { ManageMigvanSapakService } from './manage-migvan-sapak.service';
import { MigvanSapak } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/migvanSapak';
@Controller(ACTION)
@UseGuards(AuthGuard('jwt'))
@Rbac({
    action: ACTION,
    permissions: [
      BASE_ROLE.MANAGER,
      {
        role: BASE_ROLE.USER,
        tasks: ["read","create","edit","delete"]
      }
    ]
  })
export class ManageMigvanSapakController {
    @Inject(ManageMigvanSapakService) private readonly manageMigvanSapakService: ManageMigvanSapakService;
    // @Inject(AppLogger) private readonly appLogger: AppLogger;

    @Get()
    @Rbac({
        action: ACTION,
        tasks: ["read"],
      })
    async getMigvanSapakim(@ReqUser() user: AuthUser) {
        return await this.manageMigvanSapakService.getMigvanSapakim(user.netw);
    }
    @Get("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["read"],
      })
    async getMigvanSapakById(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
        return await this.manageMigvanSapakService.getMigvanSapakById(user.netw, Id);
    }
    @Post()
    @Rbac({
        action: ACTION,
        tasks: ["create"],
      })
    async addMigvanSapak(@ReqUser() user: AuthUser, @Body('record') record: MigvanSapak) {
        return await this.manageMigvanSapakService.addMigvanSapak(user.netw, record);
    }
    @Put("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["edit"],
      })
    async updateBranch(@ReqUser() user: AuthUser, @Body('record') record: MigvanSapak, @Param('Id') Id: number) {
        return await this.manageMigvanSapakService.updateMigvanSapak(user.netw, record, Id);
    }
    @Delete("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["delete"],
      })
    async deleteSapak(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
        return await this.manageMigvanSapakService.deleteMigvanSapak(user.netw, Id);
    }
}


