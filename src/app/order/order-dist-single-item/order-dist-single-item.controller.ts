import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { OrderDistSingleItemService } from './order-dist-single-item.service';
import { OrderInternalOrderService } from '../order-internal-order/order-internal-order.service';
import { DataInternalOrderService } from '../../data/data-internal-order/data-internal-order.service';
import { DataCatalogService } from '../../data/data-catalog/data-catalog.service';
import { DataBranchService } from '../../data/data-branch/data-branch.service';
import { ManageSingleSupplierItemService } from '../../manage/manage-managment/manage-single-supplier-item/manage-single-supplier-item.service';
import { ReservedOrder, ReservedOrderData } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'order/distSingleItem';
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
export class OrderDistSingleItemController {
    @Inject(OrderDistSingleItemService) private readonly orderDistSingleItemService: OrderDistSingleItemService;
    @Inject(DataInternalOrderService) private readonly dataInternalOrderService: DataInternalOrderService;
    @Inject(OrderInternalOrderService) private readonly orderInternalOrderService: OrderInternalOrderService;
    @Inject(DataCatalogService) private readonly dataCatalogService: DataCatalogService;
    @Inject(DataBranchService) private readonly dataBranchService: DataBranchService;
    @Inject(ManageSingleSupplierItemService) private readonly manageSingleSupplierItemService: ManageSingleSupplierItemService;

    //   @Inject(AppLogger) private readonly appLogger: AppLogger;

    @Get()
    @Rbac({
        action: ACTION,
        tasks: ["read"],
    })
    async getReservedOrders(@ReqUser() user: AuthUser) {
        return await this.orderDistSingleItemService.getReservedOrders(user.netw);
    }

    @Get("/:OrderDate")
    @Rbac({
        action: ACTION,
        tasks: ["read"],
    })
    async getReservedOrdersByDate(@ReqUser() user: AuthUser, @Param('OrderDate') OrderDate: string) {
        return await this.orderDistSingleItemService.getReservedOrdersByDate(user.netw, OrderDate);
    }

    @Get("/last")
    @Rbac({
        action: ACTION,
        tasks: ["read"],
    })
    async getLastReservedOrder(@ReqUser() user: AuthUser) {
        return await this.orderDistSingleItemService.getLastReservedOrder(user.netw);
    }

    @Post()
    @Rbac({
        action: ACTION,
        tasks: ["create"],
    })
    async addReservedOrder(@ReqUser() user: AuthUser, @Body('record') record: ReservedOrderData) {
        // this.appLogger.log({
        //   record: JSON.stringify(record),
        //   action: "addBranch",
        //   userId: user.id,
        //   branchId: user.branches[0]
        // });
        return await this.orderDistSingleItemService.addReservedOrder(user.netw, record);
    }

    @Post("/latest")
    @Rbac({
        action: ACTION,
        tasks: ["create"],
    })
    async addLatestReservedOrders(@ReqUser() user: AuthUser) {
        let lastOrder = await this.dataInternalOrderService.getLastInternalOrder(user.netw);
        let lastReserveOrder = await this.orderDistSingleItemService.getLastReservedOrder(user.netw);
        let lastReserveOrderNumber = 0;
        if (typeof lastReserveOrder[0] != 'undefined') lastReserveOrderNumber = lastReserveOrder[0].OrderNum;
        if (lastReserveOrderNumber < lastOrder[0].OrderNum) {
            let newOrders = await this.orderInternalOrderService.getLatestInternalOrders(user.netw, lastReserveOrderNumber);
            let length = newOrders.length;
            // Add all new orders into table Reserve_order
            for (let i = 0; i < length; i++) {
                let item = await this.dataCatalogService.getCatalogItemById(user.netw, newOrders[i].BarCode);
                let branch = await this.dataBranchService.getBranchById(user.netw, newOrders[i].BranchId);
                let singleSupplierItem = await this.manageSingleSupplierItemService.getSingleSupplierItemByBarCode(user.netw, newOrders[i].BarCode);
                // add internalOredr to ReservedOrder only if it exists in table single_supplier_item
                if (typeof singleSupplierItem[0] != 'undefined') {
                    let record: ReservedOrderData = {
                        DeliveryDate: newOrders[i].DeliveryDate,
                        OrderDate: newOrders[i].OrderDate,
                        BarCode: newOrders[i].BarCode,
                        NetworkId: branch[0].NetworkId,
                        BranchId: branch[0].BranchId,
                        ClassId: item[0].ClassesId,
                        GroupId: item[0].GroupId,
                        SupplierId: singleSupplierItem[0].SupplierId,
                        OrderNum: newOrders[i].OrderNum,
                        AmountOrdered: newOrders[i].AmountOrdered,
                        AmountApproved: newOrders[i].AmountOrdered,
                        CreatedBy: user.id,
                        IsOrderSent: 0,
                        RecordType: 'order'
                    }
                    await this.orderDistSingleItemService.addReservedOrder(user.netw, record);
                }
            }
        }
    }


    @Put("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["edit"],
    })
    async updateReservedOrder(@ReqUser() user: AuthUser, @Param('Id') Id: number, @Body('record') record: ReservedOrder) {
        // this.appLogger.log({
        //   record: JSON.stringify(record),
        //   action: "updateBranch",
        //   userId: user.id,
        //   branchId: user.branches[0]
        // });
        return await this.orderDistSingleItemService.updateReservedOrder(user.netw, Id, record);
    }

    //   @Delete("/:Id")
    //   @Rbac({
    //     action: ACTION,
    //     tasks: ["delete"],
    //   })
    //   async deleteReserve(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
    //     // let record: Branch = await this.manageBranchesService.getBranchById(user.netw, BranchId);
    //     // this.appLogger.log({
    //     //   record: JSON.stringify(record),
    //     //   action: "deleteBranch",
    //     //   userId: user.id,
    //     //   branchId: user.branches[0]
    //     // });
    //     return await this.orderDistParitService.deleteReserve(user.netw, Id);
    //   }
}
