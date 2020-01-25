import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/shared/user/user.service';
import { ManageCategoryService } from './manage-category.service';
import { Category } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/category';

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
export class ManageCategoryController {
    @Inject(ManageCategoryService) private readonly manageCategoryService: ManageCategoryService;

    @Get()
    async getCategorys(@ReqUser() user: AuthUser) {
        return await this.manageCategoryService.getCategorys(user.netw);
    }
    @Get("/:id")
    async getCategoryById(@ReqUser() user: AuthUser, @Param('id') id: number) {
        return await this.manageCategoryService.getCategoryById(user.netw, id);
    }
    @Post()
    async addCategory(@ReqUser() user: AuthUser, @Body('record') record: Category) {
        return await this.manageCategoryService.addCategory(user.netw, record);
    }
    @Put("/:id")
    async updateCategory(@ReqUser() user: AuthUser, @Body('record') record: Category, @Param('id') id: number) {
        return await this.manageCategoryService.updateCategory(user.netw, record);
    }
    @Delete("/:id")
    async deleteCategory(@ReqUser() user: AuthUser, @Param('id') id: number) {
        return await this.manageCategoryService.deleteCategory(user.netw, id);
    }
}