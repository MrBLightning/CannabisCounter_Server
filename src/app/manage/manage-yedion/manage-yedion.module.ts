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

@Module({
    imports: [RbacModule, MysqlModule],
    controllers: [
        ManageSubtitleController,
        ManageYedmivController,
        ManageYedtzController,
        ManageYedController
    ],
    providers: [
        ManageSubtitleService,
        ManageYedmivService,
        ManageYedtzService,
        ManageYedService
    ]
})
export class ManageYedionModule { }
