import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataCatalogService } from './data-catalog.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('data/catalogItem')
@UseGuards(AuthGuard('jwt'))
export class DataCatalogController {
    @Inject(DataCatalogService) private readonly dataCatalogService: DataCatalogService;

    @Get()
    async getCatalogItems(@ReqUser() user:AuthUser,) {
        return await this.dataCatalogService.getCatalogItems(user.netw);
    }
    @Get("/:BarCode")
    async getCatalogItemById(@ReqUser() user:AuthUser, @Param('BarCode') BarCode: number) {
        return await this.dataCatalogService.getCatalogItemById(user.netw, BarCode);
    }
}