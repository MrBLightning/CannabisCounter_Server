import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/shared/user/user.service';
import { ManageUnitSizeService } from './manage-unit-size.service';
import { BranchNetwork, UnitSize } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/unitSize';

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
export class ManageUnitSizeController {
    @Inject(ManageUnitSizeService) private readonly manageUnitSizeService: ManageUnitSizeService;

    @Get()
    async getUnitSizes(@ReqUser() user: AuthUser) {
        return await this.manageUnitSizeService.getUnitSizes(user.netw);
    }
    @Get("/:Id")
    async getUnitSizeById(@ReqUser() user: AuthUser, @Param('Id') id: number) {
        return await this.manageUnitSizeService.getUnitSizeById(user.netw, id);
    }
    @Post()
    async addUnitSize(@ReqUser() user: AuthUser, @Body('record') record: UnitSize) {
        return await this.manageUnitSizeService.addUnitSize(user.netw, record);
    }
    @Put("/:Id")
    async updateUnitSize(@ReqUser() user: AuthUser, @Body('record') record: UnitSize, @Param('Id') Id: number) {
        return await this.manageUnitSizeService.updateUnitSize(user.netw, record);
    }
    @Delete("/:Id")
    async deleteUnitSize(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
        return await this.manageUnitSizeService.deleteUnitSize(user.netw, Id);
    }
}