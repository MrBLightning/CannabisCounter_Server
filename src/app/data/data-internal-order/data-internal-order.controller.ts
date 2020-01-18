import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataInternalOrderService } from './data-internal-order.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('data/internalOrder')
@UseGuards(AuthGuard('jwt'))
export class DataInternalOrderController {
    @Inject(DataInternalOrderService) private readonly dataInternalOrderService: DataInternalOrderService;

    @Get()
    async getInternalOrders(@ReqUser() user: AuthUser, ) {
        return await this.dataInternalOrderService.getInternalOrders(user.netw);
    }

    @Get("/last")
    async getLastInternalOrder(@ReqUser() user: AuthUser, ) {
        return await this.dataInternalOrderService.getLastInternalOrder(user.netw);
    }

    @Get("/:UserId")
    async getInternalOrdersByUSer(@ReqUser() user: AuthUser, @Param('UserId') UserId: number) {
        return await this.dataInternalOrderService.getInternalOrdersByUSer(user.netw, UserId);
    }
}