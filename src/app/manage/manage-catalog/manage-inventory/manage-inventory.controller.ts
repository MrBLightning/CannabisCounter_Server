import { Controller, Inject, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { ManageInventoryService } from './manage-inventory.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { Inventory } from 'src/shared/types/system.types';
import { Stock } from 'src/shared/types/system.types';
import { AuthGuard } from '@nestjs/passport';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/stock';

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
export class ManageInventoryController {
  @Inject(ManageInventoryService) private readonly manageInventoryService: ManageInventoryService;

  @Get()
  @Rbac({
    action: ACTION,
    tasks: ["read"],
  })
  async getStocks(@ReqUser() user: AuthUser) {
    return await this.manageInventoryService.getStocks(user.netw);
  }
  @Get("/:id")
  @Rbac({
    action: ACTION,
    tasks: ["read"],
  })
  async getStockById(@ReqUser() user: AuthUser, @Param('id') id: number) {
    return await this.manageInventoryService.getStockById(user.netw, id);
  }
  @Post()
  @Rbac({
    action: ACTION,
    tasks: ["create"],
  })
  async addStock(@ReqUser() user: AuthUser, @Body('record') record: Stock) {
    return await this.manageInventoryService.addStock(user.netw, record);
  }
  @Put("/:id")
  @Rbac({
    action: ACTION,
    tasks: ["edit"],
  })
  async updateStock(@ReqUser() user: AuthUser, @Body('record') record: Stock, @Param('id') id: number) {
    return await this.manageInventoryService.updateStock(user.netw, record);
  }
  @Delete("/:id")
  @Rbac({
    action: ACTION,
    tasks: ["delete"],
  })
  async deleteStock(@ReqUser() user: AuthUser, @Param('id') id: number) {
    return await this.manageInventoryService.deleteStock(user.netw, id);
  }
}