import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { ManageDordersService } from './manage-dorders.service';
import { Dorder } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/dorder';
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
export class ManageDordersController {
    @Inject(ManageDordersService) private readonly danageDordersService: ManageDordersService;
    @Inject(AppLogger) private readonly appLogger: AppLogger;

    @Get()
    @Rbac({
        action: ACTION,
        tasks: ["read"],
    })
    async getDorders(@ReqUser() user: AuthUser) {
        return await this.danageDordersService.getDorders(user.netw);
    }
    @Get("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["read"],
    })
    async getDorderById(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
        return await this.danageDordersService.getDorderById(user.netw, Id);
    }
    @Post()
    @Rbac({
        action: ACTION,
        tasks: ["create"],
    })
    async addDorder(@ReqUser() user: AuthUser, @Body('record') record: Dorder) {
        return await this.danageDordersService.addDorder(user.netw, record);
    }
    @Put("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["edit"],
    })
    async updateDorder(@ReqUser() user: AuthUser, @Body('record') record: Dorder, @Param('Id') Id: number) {
        return await this.danageDordersService.updateDorder(user.netw, record, Id);
    }
    @Delete("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["delete"],
    })
    async deleteDorder(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
        return await this.danageDordersService.deleteDorder(user.netw, Id);
    }
}
