import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataSingleSupplierItemService } from './data-single-supplier-item.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('data/singleSupplierItem')
@UseGuards(AuthGuard('jwt'))
export class DataSingleSupplierItemController {
    @Inject(DataSingleSupplierItemService) private readonly dataSingleSupplierItemService: DataSingleSupplierItemService;

    @Get()
    async getSingleSupplierItems(@ReqUser() user:AuthUser,) {
        return await this.dataSingleSupplierItemService.getSingleSupplierItems(user.netw);
    }
    @Get("/:id")
    async getSingleSupplierItemById(@ReqUser() user:AuthUser, @Param('id') id: number) {
        return await this.dataSingleSupplierItemService.getSingleSupplierItemById(user.netw, id);
    }
}