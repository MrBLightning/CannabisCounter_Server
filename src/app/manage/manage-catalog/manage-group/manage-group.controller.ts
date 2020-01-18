import { Controller, Inject, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { ManageGroupService } from './manage-group.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { Group } from 'src/shared/types/system.types';
import { AuthGuard } from '@nestjs/passport';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/group';

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
export class ManageGroupController {
  @Inject(ManageGroupService) private readonly manageGroupService: ManageGroupService;

  @Get()
  @Rbac({
    action: ACTION,
    tasks: ["read"],
  })
  async getGroups(@ReqUser() user: AuthUser) {
    return await this.manageGroupService.getGroups(user.netw);
  }
  @Get("/:id")
  @Rbac({
    action: ACTION,
    tasks: ["read"],
  })
  async getGroupById(@ReqUser() user: AuthUser, @Param('id') id: number) {
    return await this.manageGroupService.getGroupById(user.netw, id);
  }
  @Post()
  @Rbac({
    action: ACTION,
    tasks: ["create"],
  })
  async addGroup(@ReqUser() user: AuthUser, @Body('record') record: Group) {
    return await this.manageGroupService.addGroup(user.netw, record);
  }
  @Put("/:id")
  @Rbac({
    action: ACTION,
    tasks: ["edit"],
  })
  async updateGroup(@ReqUser() user: AuthUser, @Body('record') record: Group, @Param('id') id: number) {
    return await this.manageGroupService.updateGroup(user.netw, record);
  }
  @Delete("/:id")
  @Rbac({
    action: ACTION,
    tasks: ["delete"],
  })
  async deleteGroup(@ReqUser() user: AuthUser, @Param('id') id: number) {
    return await this.manageGroupService.deleteGroup(user.netw, id);
  }
}