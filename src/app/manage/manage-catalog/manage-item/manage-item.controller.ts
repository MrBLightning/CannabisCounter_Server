import { Controller, Inject, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { ManageItemService } from './manage-item.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { CatalogItem } from 'src/shared/types/system.types';
import { CannabisItem } from 'src/shared/types/system.types';
import { AuthGuard } from '@nestjs/passport';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/item';

@Controller(ACTION)
@UseGuards(AuthGuard('jwt'))
@Rbac({
  action: ACTION,
  permissions: [
    BASE_ROLE.MANAGER,
    {
      role: BASE_ROLE.USER,
      tasks: ["read"]
    }
  ]
})
export class ManageItemController {
  @Inject(ManageItemService) private readonly manageItemService: ManageItemService;

  @Get()
  @Rbac({
    action: ACTION,
    tasks: ["read"],
  })
  async getItems(@ReqUser() user: AuthUser) {
    return await this.manageItemService.getItems(user.netw);
  }

  @Get("/:BarCode")
  @Rbac({
    action: ACTION,
    tasks: ["read"],
  })
  async getItemById(@ReqUser() user: AuthUser, @Param('BarCode') BarCode: number) {
    return await this.manageItemService.getItemById(user.netw, BarCode);
  }

  @Post()
  @Rbac({
    action: ACTION,
    tasks: ["create"],
  })
  async addItem(@ReqUser() user: AuthUser, @Body('record') record: CannabisItem) {
    return await this.manageItemService.addItem(user.netw, record);
  }

  @Put("/:BarCode")
  @Rbac({
    action: ACTION,
    tasks: ["edit"],
  })
  async updateItem(@ReqUser() user: AuthUser, @Body('record') record: CannabisItem, @Param('BarCode') BarCode: number) {
    return await this.manageItemService.updateItem(user.netw, record);
  }

  @Delete("/:BarCode")
  @Rbac({
    action: ACTION,
    tasks: ["delete"],
  })
  async deleteItem(@ReqUser() user: AuthUser, @Param('BarCode') BarCode: number) {
    return await this.manageItemService.deleteItem(user.netw, BarCode);
  }
}