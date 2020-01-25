import { Controller, Get, Inject, Post, Body, Param, Put, BadRequestException, Query, UseGuards } from '@nestjs/common';
import { PlanogramCatalogService } from './planogram-catalog.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('planogram')
@UseGuards(AuthGuard('jwt'))
export class CatalogController {
    @Inject(PlanogramCatalogService) private readonly catalogService: PlanogramCatalogService;
    
    @UseGuards(AuthGuard('jwt'))
    @Get('/catalog')
    async getCatalog(@ReqUser() user: AuthUser) {
        console.log('getCatalog');
        const catalog = await this.catalogService.getCatalog(user.netw);
        console.log(catalog);
        return catalog;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/catalog/:barcode')
    async catalogProduct(@ReqUser() user: AuthUser, @Param('barcode') barcode: any) {
        return await this.catalogService.getBarcodeProduct(user.netw, barcode)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/degem/:degemId')
    async productByDegem(@ReqUser() user: AuthUser, @Param("degemId") degemId: any) {
        return await this.catalogService.getBarcodeProductByDegem(user.netw, degemId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/catalog/dimensions')
    async updateMultipleBarcodeDimensions(@ReqUser() user: AuthUser, @Body('products') products: any) {
        return await this.catalogService.updateMultipleBarcodeDimensions(user.netw, products);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/catalog/:barcode')
    async updateBarcodeDimensions(@ReqUser() user: AuthUser, @Param("barcode") barcode, @Body("dimensions") dimensions) {
        return await this.catalogService.updateBarcodeDimensions(user.netw, barcode, dimensions);
    }

    // Barcode statuses
    @UseGuards(AuthGuard('jwt'))
    @Get('/barcode/statuses')
    async getBarcodeStatus(@ReqUser() user: AuthUser ) {
        return await this.catalogService.getBarcodeStatus(user.netw);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/barcode/status/:barcode')
    async updateBarcodeStatus(@Param('barcode') barcode: any, @Body("message") message, @ReqUser() user: AuthUser) {
        if (!barcode)
            throw new BadRequestException("Missing barcode")
        if (!message)
            throw new BadRequestException("No message was sent.")
        await this.catalogService.updateBarcodeStatus(user.netw, barcode, message, user.id);
        return {
            status: "ok",
            message: "Successfully updated message",
        };
    }




    // Sales
    @UseGuards(AuthGuard('jwt'))
    @Get('/sales')
    async getSales(@ReqUser() user: AuthUser, @Query() query: any) {
        const records = await this.catalogService.getCatalogSales(user.netw, query);
        return {
            status: "OK",
            sales: records
        };
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/sales/batch')
    async getBranchSalesBulk(@ReqUser() user: AuthUser, @Body('barcodes') barcodes: any, @Body('branchId') branchId) {
        if (!barcodes || !branchId)
            throw new BadRequestException();
        let records = [];
        if (barcodes.length > 0)
            records = await this.catalogService.getBranchSalesBulk(user.netw, barcodes, branchId);
        return {
            status: "OK",
            sales: records
        };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/sales/barcode')
    async get(@ReqUser() user: AuthUser, @Query("branch_id") branch_id, @Query('barcode') barcode) {
        if (!branch_id || !barcode)
            return new BadRequestException('Bad parameters were given.')
        let results;
        try {
            results = await this.catalogService.getProductSales(user.netw, barcode, branch_id);
        } catch (error) {

        }
        if (!results[0])
            return {
                status: "empty"
            };
        return {
            status: "ok",
            sale: results[0]
        };
    }

}
