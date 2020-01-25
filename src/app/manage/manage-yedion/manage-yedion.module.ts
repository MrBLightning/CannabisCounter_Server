import { Module } from '@nestjs/common';
import { MysqlModule } from 'src/shared/mysql/mysql.module';
import { RbacModule } from 'src/shared/rbac/rbac.module';

import { ManageSubtitleService } from './manage-subtitle/manage-subtitle.service';
import { ManageSubtitleController } from './manage-subtitle/manage-subtitle.controller';
import { ManageYedmivService } from './manage-yedmiv/manage-yedmiv.service';
import { ManageYedmivController } from './manage-yedmiv/manage-yedmiv.controller';
import { ManageYedtzService } from './manage-yedtz/manage-yedtz.service';
import { ManageYedtzController } from './manage-yedtz/manage-yedtz.controller';
import { ManageYedService } from './manage-yed/manage-yed.service';
import { ManageYedController } from './manage-yed/manage-yed.controller';
import { ManageYedionService } from './manage-yedion/manage-yedion.service';
import { ManageYedionController } from './manage-yedion/manage-yedion.controller';
import { ManageProductCampaignService } from './manage-product-campaign/manage-product-campaign.service';
import { ManageProductCampaignController } from './manage-product-campaign/manage-product-campaign.controller';

@Module({
    imports: [RbacModule, MysqlModule],
    controllers: [
        ManageSubtitleController,
        ManageYedmivController,
        ManageYedtzController,
        ManageYedController,
        ManageYedionController,
        ManageProductCampaignController
    ],
    providers: [
        ManageSubtitleService,
        ManageYedmivService,
        ManageYedtzService,
        ManageYedService,
        ManageYedionService,
        ManageProductCampaignService
    ]
})
export class ManageYedionModule { }
