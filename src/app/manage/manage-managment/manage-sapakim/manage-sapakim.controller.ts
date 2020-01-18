import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/shared/user/user.service';
import { ManageSapakimService } from './manage-sapakim.service';
import { Department } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/sapak';

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
export class ManageSapakimController {
    @Inject(ManageSapakimService) private readonly manageSapakimService: ManageSapakimService;

    @Get()
    async getDepartments(@ReqUser() user: AuthUser) {
        return await this.manageSapakimService.getSapakim(user.netw);
    }
    @Get("/:id")
    async getDepartmentById(@ReqUser() user: AuthUser, @Param('id') id: number) {
        return await this.manageSapakimService.getSapakById(user.netw, id);
    }
    @Post()
    async addDepartment(@ReqUser() user: AuthUser, @Body('record') record: Department) {
        return await this.manageSapakimService.addSapak(user.netw, record);
    }
    @Put("/:id")
    async updateDepartment(@ReqUser() user: AuthUser, @Body('record') record: Department, @Param('id') id: number) {
        return await this.manageSapakimService.updateSapak(user.netw, record);
    }
    @Delete("/:id")
    async deleteDepartment(@ReqUser() user: AuthUser, @Param('id') id: number) {
        return await this.manageSapakimService.deleteSapak(user.netw, id);
    }
}