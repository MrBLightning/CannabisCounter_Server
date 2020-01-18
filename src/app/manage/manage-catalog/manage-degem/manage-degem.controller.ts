import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/shared/user/user.service';
import { ManageDegemService } from './manage-degem.service';
import { Degem } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/degem';

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

export class ManageDegemController {
    @Inject(ManageDegemService) private readonly manageDegemService: ManageDegemService;

    @Get()
    @Rbac({
        action: ACTION,
        tasks: ["read"],
      })
    async getDegems(@ReqUser() user: AuthUser) {
        return await this.manageDegemService.getDegems(user.netw);
    }

    @Get("/:id")
    @Rbac({
        action: ACTION,
        tasks: ["read"],
      })
    async getDegemById(@ReqUser() user: AuthUser, @Param('id') id: number) {
        return await this.manageDegemService.getDegemById(user.netw, id);
    }

    @Post()
    @Rbac({
        action: ACTION,
        tasks: ["create"],
      })
    async addDegem(@ReqUser() user: AuthUser, @Body('record') record: Degem) {
        return await this.manageDegemService.addDegem(user.netw, record);
    }

    @Put("/:id")
    @Rbac({
        action: ACTION,
        tasks: ["edit"],
      })
    async updateDegem(@ReqUser() user: AuthUser, @Body('record') record: Degem, @Param('id') id: number) {
        return await this.manageDegemService.updateDegem(user.netw, record, id);
    }

    @Delete("/:id")
    @Rbac({
        action: ACTION,
        tasks: ["delete"],
      })
    async deleteDegem(@ReqUser() user: AuthUser, @Param('id') id: number) {
        return await this.manageDegemService.deleteDegem(user.netw, id);
    }
}
