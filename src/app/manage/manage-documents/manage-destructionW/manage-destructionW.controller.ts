import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { ManageDestructionWService } from './manage-destructionW.service';
import { Destruction } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/destructionW';
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
export class ManageDestructionWController {
    @Inject(ManageDestructionWService) private readonly manageDestructionWService: ManageDestructionWService;

  @Put("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["edit"],
      })
    async updateDestruction(@ReqUser() user: AuthUser, @Body('record') record: Destruction, @Param('Id') Id: number) {
        return await this.manageDestructionWService.updateDestruction(user.netw, record, Id);
    }
    
}


