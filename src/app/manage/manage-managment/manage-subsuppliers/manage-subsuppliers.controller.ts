import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { ManageSubSuppliersService } from './manage-subsuppliers.service';
import { Subsapak } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/subsuppliers';
const ACTION2 = 'manage/subsuppliersParent';

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
@Controller(ACTION2)
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

export class ManageSubSuppliersController {
    @Inject(ManageSubSuppliersService) private readonly manageSubSuppliersService: ManageSubSuppliersService;

    @Put("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["edit"],
    })
    async updateSupSupplierItem(@ReqUser() user: AuthUser, @Body('record') record: Subsapak, @Param('Id') Id: number) {
        return await this.manageSubSuppliersService.updateSupSupplierItem(user.netw, record, Id);
    }

    @Put()
    @Rbac({
        action: ACTION2,
        tasks: ["edit"],
    })
    async updateSubSupplierParent(@ReqUser() user: AuthUser, @Body('record') record: any) {
        console.log("ddddddddddddddd")
        return await this.manageSubSuppliersService.updateSubSupplierParent(user.netw, record);
    }


    
    @Delete("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["delete"],
    })
    async deleteSupSupplierItem(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
        return await this.manageSubSuppliersService.deleteSupSupplierItem(user.netw, Id);
    }



    @Delete("/:Id")
    @Rbac({
        action: ACTION2,
        tasks: ["delete"],
    })
    async deleteSupSupplierParent(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
        console.log("delete parent2",Id)
        return await this.manageSubSuppliersService.deleteSupSupplierParent(user.netw, Id);
    }




    @Post()
    @Rbac({
        action: ACTION,
        tasks: ["create"],
    })
    async addSupSupplierItem(@ReqUser() user: AuthUser, @Body('record') record: Subsapak) {
        return await this.manageSubSuppliersService.addSupSupplierItem(user.netw, record);

    }

}



