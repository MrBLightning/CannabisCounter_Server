import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/shared/user/user.service';
import { ManageSuppliersService } from './manage-suppliers.service';
import { Supplier } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/suppliers';

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
export class ManageSuppliersController {
    @Inject(ManageSuppliersService) private readonly manageSuppliersService: ManageSuppliersService;

    @Get()
    async getSuppliers(@ReqUser() user: AuthUser) {
        return await this.manageSuppliersService.getSuppliers(user.netw);
    }
    @Get("/:id")
    async getSupplierById(@ReqUser() user: AuthUser, @Param('id') id: number) {
        return await this.manageSuppliersService.getSupplierById(user.netw, id);
    }
    @Post()
    async addSupplier(@ReqUser() user: AuthUser, @Body('record') record: Supplier) {
        return await this.manageSuppliersService.addSupplier(user.netw, record);
    }
    @Put("/:id")
    async updateSupplier(@ReqUser() user: AuthUser, @Body('record') record: Supplier, @Param('id') id: number) {
        return await this.manageSuppliersService.updateSupplier(user.netw, record);
    }
    @Delete("/:id")
    async deleteSupplier(@ReqUser() user: AuthUser, @Param('id') id: number) {
        return await this.manageSuppliersService.deleteSupplier(user.netw, id);
    }
}