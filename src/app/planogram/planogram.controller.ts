import { Controller, Get, Inject, Param, BadRequestException, Post, Put, Body, Delete, UseGuards } from '@nestjs/common';
import { PlanogramService } from './planogram.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AisleSchema, PlacementObject } from './planogram.schema';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('planogram')
@UseGuards(AuthGuard('jwt'))
export class PlanogramController {
    @Inject(PlanogramService) private readonly planogramService: PlanogramService;

    @Get('/stores')
    async getStores(@ReqUser() user: AuthUser) {
        const stores = await this.planogramService.getStores(user.netw, user.role !== BASE_ROLE.SUPER ? user.branches : []);
        return {
            status: stores != null ? "ok" : "empty",
            stores: stores,
        };
    }

    @Get('/:branch_id')
    async branchStores(@ReqUser() user: AuthUser, @Param('branch_id') branchId) {
        if (!branchId)
            throw new BadRequestException("Branch was not provided.");
        const stores = await this.planogramService.getStores(user.netw, branchId);
        return {
            status: stores != null ? "ok" : "empty",
            stores: stores,
        };
    }
    @Post('/:branch_id/new')
    async createBranchStore(@Param('branch_id') branchId, @ReqUser() user: AuthUser) {
        if (!branchId)
            throw new BadRequestException("Branch was not provided.");
        const store = await this.planogramService.createNewStore(user.netw, branchId, user.id);
        return {
            status: "ok",
            store,
        }
    }
    @Get('/store/:store_id')
    async getStore(@ReqUser() user: AuthUser, @Param('store_id') store_id) {
        if (!store_id)
            throw new BadRequestException("Store id was not provided.");
        const store = await this.planogramService.getStore(user.netw, store_id);
        return {
            status: store != null ? "ok" : "empty",
            store: store,
        };
    }
    @Put('/store/:store_id/name')
    async updateStoreName(@ReqUser() user: AuthUser, @Param('store_id') store_id, @Body('name') name) {
        if (!store_id)
            throw new BadRequestException("Store id was not provided.");
        if (!name)
            throw new BadRequestException("No new name provided");
        await this.planogramService.renameStore(user.netw, store_id, name);
        return {
            status: "ok",
            message: "Successfully renamed store."
        }
    }
    @Delete('/store/:store_id')
    async deleteStore(@ReqUser() user: AuthUser, @Param('store_id') store_id) {
        if (!store_id)
            throw new BadRequestException("Store id was not provided.");
        const result = await this.planogramService.deleteStore(user.netw, store_id)
        return {
            status: "ok",
            message: "Deleted store " + store_id + " successfully",
            result
        }
    }

    @Get('/store/:store_id/aisle/create')
    async createStoreAisle(@ReqUser() user: AuthUser, @Param('store_id') store_id) {
        if (!store_id)
            throw new BadRequestException("Store id was not provided.");
        const aisle = await this.planogramService.createAisle(user.netw, store_id);
        return {
            status: "ok",
            aisle
        };
    }
    @Get('/store/:store_id/aisle/:aisle_id')
    async getStoreAisle(@ReqUser() user: AuthUser, @Param('store_id') store_id, @Param('aisle_id') aisle_id) {
        if (!store_id || !aisle_id)
            throw new BadRequestException("Store id or aisle id was not provided.");
        const aisle = await this.planogramService.getAisle(user.netw, store_id, aisle_id);
        return {
            status: aisle != null ? "ok" : "empty",
            aisle: aisle,
        };
    }
    @Post('/store/:store_id/aisle/:aisle_id')
    async saveStoreAisle(@ReqUser() user: AuthUser, @Body() data, @Param('store_id') store_id, @Param('aisle_id') aisle_id) {
        if (!store_id || !aisle_id)
            throw new BadRequestException("Store id or aisle id was not provided.");
        if (!data || !data.aisle || !store_id || !aisle_id)
            throw new BadRequestException();
        const aisleValidation = AisleSchema.validate(data.aisle);
        const newAisle = await this.planogramService.saveAisle(user.netw, store_id, aisleValidation.value);
        return {
            status: "ok",
            aisle: newAisle
        };
    }
    @Delete('/store/:store_id/aisle/:aisle_id')
    async deleteStoreAisle(@ReqUser() user: AuthUser, @Param('store_id') store_id, @Param('aisle_id') aisle_id) {
        if (!store_id || !aisle_id)
            throw new BadRequestException("Store id or aisle id was not provided.");
        await this.planogramService.deleteAisle(user.netw, store_id, aisle_id);
        return {
            status: "ok",
            message: "Successfully deleted aisle from store"
        };
    }
    @Post('/store/:store_id/item')
    async post(@ReqUser() user: AuthUser, @Body() data, @Param('store_id') store_id) {
        if (!store_id || data == null || !data.shelf_id || !data.barcode)
            return new BadRequestException();
        const {
            shelf_id,
            barcode,
            placement,
            item_id
        } = data;
        const newStore = await this.planogramService.addShelfBarcode(user.netw, {
            storeId: store_id,
            shelfId: shelf_id,
            barcode,
            placement,
            shelfItemId: item_id
        });
        return {
            status: "ok",
            store: newStore
        };
    }
    @Put('/store/:store_id/item/:shelf_item_id')
    async updateShelfBarcode(@ReqUser() user: AuthUser, @Body("placement") placement, @Body("barcode") barcode, @Param('store_id') store_id, @Param('shelf_item_id') shelf_item_id) {
        if (!store_id || !shelf_item_id)
            return new BadRequestException();
        const placementObjectError = PlacementObject.validate(placement).error;
        if (placementObjectError)
            return new BadRequestException(placementObjectError);
        const item = await this.planogramService.updateShelfBarcode(user.netw, store_id, shelf_item_id, placement, barcode);
        return !item ? {
            status: "error",
            message: "Unable to update barcode",
        } : {
                status: "ok",
                item
            };
    }
    @Delete('/store/:store_id/item/:shelf_item_id')
    async delete(@ReqUser() user: AuthUser, @Param('store_id') store_id, @Param('shelf_item_id') shelf_item_id) {
        if (!store_id || !shelf_item_id)
            return new BadRequestException();
        await this.planogramService.deleteShelfItem(user.netw, store_id, shelf_item_id);
        return {
            status: "ok"
        };
    };
    @Get('/store/:store_id/shelf/:shelf_id')
    async getStoreShelfItem() {
        return {
            status: "ok",
            shelf: {}
        };
    };

    @Get('/aisle/details/:aisle_id')
    async aisleDetails(@ReqUser() user: AuthUser, @Param('aisle_id') aisle_id) {
        if (!aisle_id)
            throw new BadRequestException("Aisle id was found")
        const aisle = await this.planogramService.aisleDetails(user.netw, aisle_id);
        return {
            status: "ok",
            aisle
        };
    }


}
