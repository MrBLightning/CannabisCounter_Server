import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/shared/user/user.service';
import { ManageSubsapakService } from './manage-subsapak.service';
import { Department, Subsapak } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';


@Controller('manage/subsapak')
@UseGuards(AuthGuard('jwt'))
export class ManageSubsapakController {
    @Inject(ManageSubsapakService) private readonly manageSubsapakService: ManageSubsapakService;

    @Get()
    async getSubsapakim(@ReqUser() user: AuthUser) {
        return await this.manageSubsapakService.getSubsapakim(user.netw);
    }
    @Get("/:id")
    async getSubsapakById(@ReqUser() user: AuthUser, @Param('id') id: number) {
        return await this.manageSubsapakService.getSubsapakById(user.netw, id);
    }
    @Post()
    async addSubsapak(@ReqUser() user: AuthUser, @Body('record') record: Subsapak) {
        return await this.manageSubsapakService.addSubsapak(user.netw, record);
    }
    @Put()
    async updateSubsapak(@ReqUser() user: AuthUser, @Body('record') record: Subsapak) {
        return await this.manageSubsapakService.updateSubsapak(user.netw, record);
    }
    @Delete("/:id")
    async deleteSubsapak(@ReqUser() user: AuthUser, @Param('id') id: number) {
        return await this.manageSubsapakService.deleteSubsapak(user.netw, id);
    }
}