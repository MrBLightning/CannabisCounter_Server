import { Module } from '@nestjs/common';
import { MysqlModule } from 'src/shared/mysql/mysql.module';
import { RbacModule } from 'src/shared/rbac/rbac.module';

import { ManageDestructionWService } from './manage-destructionW/manage-destructionW.service';
import { ManageDestructionWController } from './manage-destructionW/manage-destructionW.controller';

@Module({
    imports: [RbacModule, MysqlModule],
    controllers: [
        ManageDestructionWController,
    ],
    providers: [
        ManageDestructionWService,
    ]
})
export class ManageDocumentsModule { }
