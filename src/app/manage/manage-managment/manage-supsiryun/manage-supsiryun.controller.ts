import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { ManageSupsiryunService } from './manage-supsiryun.service';
import { Supsiryun } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/supsiryun';
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
export class ManageSupsiryunController {
    @Inject(ManageSupsiryunService) private readonly manageSupsiryunService: ManageSupsiryunService;
    @Inject(AppLogger) private readonly appLogger: AppLogger;

    @Get()
    @Rbac({
        action: ACTION,
        tasks: ["read"],
    })
    async getSupsiryuns(@ReqUser() user: AuthUser) {
        return await this.manageSupsiryunService.getSupsiryuns(user.netw);
    }
    @Get("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["read"],
    })
    async getSupsiryunById(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
        return await this.manageSupsiryunService.getSupsiryunById(user.netw, Id);
    }
    @Post()
    @Rbac({
        action: ACTION,
        tasks: ["create"],
    })
    async addSupsiryun(@ReqUser() user: AuthUser, @Body('record') record: Supsiryun) {
        return await this.manageSupsiryunService.addSupsiryun(user.netw, record);
    }
    @Put("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["edit"],
    })
    async updateSupsiryun(@ReqUser() user: AuthUser, @Body('record') record: Supsiryun, @Param('Id') Id: number) {
        return await this.manageSupsiryunService.updateSupsiryun(user.netw, record, Id);
    }
    @Delete("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["delete"],
    })
    async deleteSupsiryun(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
        return await this.manageSupsiryunService.deleteSupsiryun(user.netw, Id);
    }
}
