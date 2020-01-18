import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataOrderService } from './data-order.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('data/order')
@UseGuards(AuthGuard('jwt'))
export class DataOrderController {
    @Inject(DataOrderService) private readonly dataOrderService: DataOrderService;

    @Get()
    async getOrders(@ReqUser() user: AuthUser, ) {
        return await this.dataOrderService.getOrders(user.netw);
    }

    @Get("/last")
    async getLastOrder(@ReqUser() user: AuthUser, ) {
        return await this.dataOrderService.getLastOrder(user.netw);
    }

    @Get("/:UserId")
    async getOrdersByUSer(@ReqUser() user: AuthUser, @Param('UserId') UserId: number) {
        return await this.dataOrderService.getOrdersByUSer(user.netw, UserId);
    }
}