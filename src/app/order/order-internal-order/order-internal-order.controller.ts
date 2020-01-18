import { Controller, Inject, Get, Param, Post, Delete, UseGuards, Body } from '@nestjs/common';
import { OrderInternalOrderService } from './order-internal-order.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';
import { InternalOrder } from 'src/shared/types/system.types';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'order/internalOrder';

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
export class OrderInternalOrderController {
    @Inject(OrderInternalOrderService) private readonly orderInternalOrderService: OrderInternalOrderService;

    // @Get()
    // async getMigvanBranchs(@ReqUser() user:AuthUser,) {
    //     return await this.orderItemService.getMigvanBranchs(user.netw);
    // }

    // @Get("/:BranchId")
    // async getMigvanBranchById(@ReqUser() user:AuthUser, @Param('BranchId') BranchId: number) {
    //     return await this.orderItemService.getMigvanBranchById(user.netw, BranchId);
    // }

    @Post()
    async addInternalOrder(@ReqUser() user: AuthUser, @Body('record') record: InternalOrder) {
        return await this.orderInternalOrderService.addInternalOrder(user.netw, record);
    }

    @Delete("/:Id")
    async deleteInternalOrder(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
        return await this.orderInternalOrderService.deleteInternalOrder(user.netw, Id);
    }
}