
import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataProductCampaignService } from './data-product-campaign.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';


@Controller('data/product-campaign')
@UseGuards(AuthGuard('jwt'))
export class DataProductCampaignController {
    @Inject(DataProductCampaignService) private readonly dataProductCampaignService: DataProductCampaignService;

    @Get()
    async getProductCampaignItems(@ReqUser() user: AuthUser, ) {
         return await this.dataProductCampaignService.getProductCampaignItems(user.netw);
    }
}


 