import { Controller, Inject, Get, Param, Post, Delete, UseGuards, Body, Put } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';
import { Order } from 'src/shared/types/system.types';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'order/orderItem';

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
export class OrderItemController {
    @Inject(OrderItemService) private readonly orderItemService: OrderItemService;

    // @Get()
    // async getMigvanBranchs(@ReqUser() user:AuthUser,) {
    //     return await this.orderItemService.getMigvanBranchs(user.netw);
    // }

    // @Get("/:BranchId")
    // async getMigvanBranchById(@ReqUser() user:AuthUser, @Param('BranchId') BranchId: number) {
    //     return await this.orderItemService.getMigvanBranchById(user.netw, BranchId);
    // }

    @Post()
    async addOrder(@ReqUser() user: AuthUser, @Body('record') record: Order) {
        return await this.orderItemService.addOrder(user.netw, record);
    }

    @Put("/:Id")
    async updateOrder(@ReqUser() user: AuthUser, @Param('Id') Id: number, @Body('record') record: Order) {
        return await this.orderItemService.updateOrder(user.netw, Id, record);
    }

    @Delete("/:Id")
    async deleteOrder(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
        return await this.orderItemService.deleteOrder(user.netw, Id);
    }
}