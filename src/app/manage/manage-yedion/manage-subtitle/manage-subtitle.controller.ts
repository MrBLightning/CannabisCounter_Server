import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { ManageSubtitleService } from './manage-subtitle.service';
import { Yedm } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/subtitle';
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
export class ManageSubtitleController {
    @Inject(ManageSubtitleService) private readonly manageSubtitleService: ManageSubtitleService;

    @Put("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["edit"],
    })
    async updateYedmItem(@ReqUser() user: AuthUser, @Body('record') record: Yedm, @Param('Id') Id: number) {
        return await this.manageSubtitleService.updateYedmItem(user.netw, record, Id);
    }


    @Delete("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["delete"],
    })
    async deleteYedmItem(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
        return await this.manageSubtitleService.deleteYedmItem(user.netw, Id);
    }

    @Post()
    @Rbac({
        action: ACTION,
        tasks: ["create"],
    })
    async addYedmItem(@ReqUser() user: AuthUser, @Body('record') record: Yedm) {
        return await this.manageSubtitleService.addYedmItem(user.netw, record);

    }

}


