import { Controller, Inject, Get, Param, Post, Delete, UseGuards, Body } from '@nestjs/common';
import { TransferItemService } from './transfer-item.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';
import { Order } from 'src/shared/types/system.types';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'transfer/transferItem';

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
export class TransferItemController {
    @Inject(TransferItemService) private readonly transferItemService: TransferItemService;

    // @Get()
    // async getMigvanBranchs(@ReqUser() user:AuthUser,) {
    //     return await this.orderItemService.getMigvanBranchs(user.netw);
    // }

    // @Get("/:BranchId")
    // async getMigvanBranchById(@ReqUser() user:AuthUser, @Param('BranchId') BranchId: number) {
    //     return await this.orderItemService.getMigvanBranchById(user.netw, BranchId);
    // }

    @Post()
    async addTransfer(@ReqUser() user: AuthUser, @Body('record') record: Order) {
        return await this.transferItemService.addTransfer(user.netw, record);
    }

    // @Delete("/:Id")
    // async deleteOrder(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
    //     return await this.orderItemService.deleteOrder(user.netw, Id);
    // }
}