import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { ManageSibasService } from './manage-sibas.service';
import { Siba } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/siba';
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
export class ManageSibasController {
    @Inject(ManageSibasService) private readonly manageSibasService: ManageSibasService;
    @Inject(AppLogger) private readonly appLogger: AppLogger;

    @Get()
    @Rbac({
        action: ACTION,
        tasks: ["read"],
    })
    async getSibas(@ReqUser() user: AuthUser) {
        return await this.manageSibasService.getSibas(user.netw);
    }
    @Get("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["read"],
    })
    async getSibaById(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
        return await this.manageSibasService.getSibaById(user.netw, Id);
    }
    @Post()
    @Rbac({
        action: ACTION,
        tasks: ["create"],
    })
    async addSiba(@ReqUser() user: AuthUser, @Body('record') record: Siba) {
        return await this.manageSibasService.addSiba(user.netw, record);
    }
    @Put("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["edit"],
    })
    async updateSiba(@ReqUser() user: AuthUser, @Body('record') record: Siba, @Param('Id') Id: number) {
        return await this.manageSibasService.updateSiba(user.netw, record, Id);
    }
    @Delete("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["delete"],
    })
    async deleteSiba(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
        return await this.manageSibasService.deleteSiba(user.netw, Id);
    }
}
