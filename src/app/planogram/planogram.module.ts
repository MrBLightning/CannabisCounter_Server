import { Module } from '@nestjs/common';
import { PlanogramController } from './planogram.controller';
import { PlanogramService } from './planogram.service';
import { DataController } from './data/data.controller';
import { PlanogramDataService } from './data/planogram-data.service';
import { CatalogController } from './catalog/catalog.controller';
import { PlanogramCatalogService } from './catalog/planogram-catalog.service';
import { MysqlModule } from 'src/shared/mysql/mysql.module';
import { StorageModule } from 'src/shared/storage/storage.module';

@Module({
  imports: [MysqlModule, StorageModule],
  controllers: [DataController, CatalogController, PlanogramController],
  providers: [PlanogramService, PlanogramDataService, PlanogramCatalogService]
})
export class PlanogramModule { }
