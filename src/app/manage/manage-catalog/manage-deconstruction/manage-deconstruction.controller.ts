import { Controller, Inject, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { ManageDeconstructionService } from './manage-deconstruction.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { Deconstruction } from 'src/shared/types/system.types';
import { AuthGuard } from '@nestjs/passport';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/deconstruction';

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
export class ManageDeconstructionController {
  @Inject(ManageDeconstructionService) private readonly manageDeconstructionService: ManageDeconstructionService;

//   @Get()
//   @Rbac({
//     action: ACTION,
//     tasks: ["read"],
//   })
//   async getGroups(@ReqUser() user: AuthUser) {
//     return await this.manageInventoryService.getGroups(user.netw);
//   }
//   @Get("/:id")
//   @Rbac({
//     action: ACTION,
//     tasks: ["read"],
//   })
//   async getGroupById(@ReqUser() user: AuthUser, @Param('id') id: number) {
//     return await this.manageInventoryService.getGroupById(user.netw, id);
//   }
  @Post()
  @Rbac({
    action: ACTION,
    tasks: ["create"],
  })
  async addDeconstruction(@ReqUser() user: AuthUser, @Body('record') record: Deconstruction) {
    return await this.manageDeconstructionService.addDeconstruction(user.netw, record);
  }
//   @Put("/:id")
//   @Rbac({
//     action: ACTION,
//     tasks: ["edit"],
//   })
//   async updateGroup(@ReqUser() user: AuthUser, @Body('record') record: Group, @Param('id') id: number) {
//     return await this.manageInventoryService.updateGroup(user.netw, record);
//   }
//   @Delete("/:id")
//   @Rbac({
//     action: ACTION,
//     tasks: ["delete"],
//   })
//   async deleteGroup(@ReqUser() user: AuthUser, @Param('id') id: number) {
//     return await this.manageGroupService.deleteGroup(user.netw, id);
//   }
}