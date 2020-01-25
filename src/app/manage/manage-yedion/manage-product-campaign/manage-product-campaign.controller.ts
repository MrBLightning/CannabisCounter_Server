import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { ManageProductCampaignService } from './manage-product-campaign.service';
import { CampaignType } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/product-campaign';
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
export class ManageProductCampaignController {
    @Inject(ManageProductCampaignService) private readonly manageProductCampaignService: ManageProductCampaignService;

    @Put("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["edit"],
    })
    async updateProductCampaignItem(@ReqUser() user: AuthUser, @Body('record') record: CampaignType, @Param('Id') Id: number) {
        return await this.manageProductCampaignService.updateProductCampaignItem(user.netw, record, Id);
    }

    
    @Put()
    @Rbac({
        action: ACTION,
        tasks: ["edit"],
    })
    async updateProductCampaignParent(@ReqUser() user: AuthUser, @Body('record') record: any) {
        return await this.manageProductCampaignService.updateProductCampaignParent(user.netw, record);
    }

    
    @Delete("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["delete"],
    })
    async deleteProductCampaignItem(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
        return await this.manageProductCampaignService.deleteProductCampaignItem(user.netw, Id);
    }

    @Post()
    @Rbac({
        action: ACTION,
        tasks: ["create"],
    })
    async addProductCampaignItem(@ReqUser() user: AuthUser, @Body('record') record: CampaignType) {
        return await this.manageProductCampaignService.addProductCampaignItem(user.netw, record);

    }

}


