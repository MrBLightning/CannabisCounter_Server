import { Controller, Inject, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { ManageSubgroupService } from './manage-subgroup.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { Subgroup } from 'src/shared/types/system.types';
import { AuthGuard } from '@nestjs/passport';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/subgroup';

@Controller('manage/subgroup')
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
export class ManageSubgroupController {
    @Inject(ManageSubgroupService) private readonly manageSubgroupService: ManageSubgroupService;

    @Get()
    @Rbac({
        action: ACTION,
        tasks: ["read"],
      })
    async getSubgroups(@ReqUser() user:AuthUser,) {
        return await this.manageSubgroupService.getSubgroups(user.netw);
    }
    @Get("/:id")
    @Rbac({
        action: ACTION,
        tasks: ["read"],
      })
    async getSubgroupById(@ReqUser() user:AuthUser, @Param('id') id: number) {
        return await this.manageSubgroupService.getSubgroupById(user.netw, id);
    }
    @Post()
    @Rbac({
        action: ACTION,
        tasks: ["create"],
      })
    async addSubgroup(@ReqUser() user:AuthUser, @Body('record') record: Subgroup) {
        return await this.manageSubgroupService.addSubgroup(user.netw, record);
    }
    @Put("/:id")
    @Rbac({
        action: ACTION,
        tasks: ["edit"],
      })
    async updateSubgroup(@ReqUser() user:AuthUser, @Body('record') record: Subgroup, @Param('id') id: number) {
        return await this.manageSubgroupService.updateSubgroup(user.netw, record);
    }
    @Delete("/:id")
    @Rbac({
        action: ACTION,
        tasks: ["delete"],
      })
    async deleteSubgroup(@ReqUser() user:AuthUser, @Param('id') id: number) {
        return await this.manageSubgroupService.deleteSubgroup(user.netw, id);
    }
}