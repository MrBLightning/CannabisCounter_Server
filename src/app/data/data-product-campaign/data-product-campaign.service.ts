import { Injectable, Inject } from '@nestjs/common';
import { CampaignType } from 'src/shared/types/system.types';
import { PoolConnection } from 'promise-mysql';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { MysqlService } from 'src/shared/mysql/mysql.service';


@Injectable()

export class DataProductCampaignService {
    @Inject(MysqlService) private readonly mysql: MysqlService;


    async getProductCampaignItems(netw: string): Promise<CampaignType[]> {
        console.log("getProductCampaign")
        const conn = await this.mysql.getConnection(netw);
        const results: CampaignType[] = await conn.query(`SELECT * FROM ${APP_TABLES.PRODUCT_CAMPAIGN}`);

        if (!results || !results[0])
            throw new Error("ProductCampaign types not found or empty.");
        return results;
    }
}


