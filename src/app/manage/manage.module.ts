import { Module } from '@nestjs/common';
import { ManageUserController } from './manage-user/manage-user.controller';
import { UserModule } from 'src/shared/user/user.module';
import { ManageCatalogModule } from './manage-catalog/manage-catalog.module';
import { ManageManagmentModule } from './manage-managment/manage-managment.module';
import { RbacModule } from 'src/shared/rbac/rbac.module';
import { MysqlModule } from 'src/shared/mysql/mysql.module';
import { ManageDestructionWModule } from './manage-documents/manage-documents.module';
import {ManageYedionModule} from './manage-yedion/manage-yedion.module'

@Module({
    imports: [RbacModule, MysqlModule, UserModule, ManageCatalogModule, ManageManagmentModule,ManageDestructionWModule,ManageYedionModule],
    controllers: [ManageUserController ],
    providers: [],
})
export class ManageModule {

}
