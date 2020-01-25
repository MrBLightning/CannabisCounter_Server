import { Injectable, Inject } from '@nestjs/common';
import { CampaignType } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';

@Injectable()
export class ManageProductCampaignService {
    @Inject(MysqlService) private readonly mysql: MysqlService;


    async updateProductCampaignItem(netw: string, record: CampaignType, Id: number): Promise<number> {
        console.log("update");
        const conn = await this.mysql.getConnection(netw);
        const results: number = await conn.query(`UPDATE ${APP_TABLES.PRODUCT_CAMPAIGN} SET ?  WHERE Id = ?`, [record, Id]);

        if (!results)
            throw new Error("ProductCampaign not updated.");
        return results;
    };


    async updateProductCampaignParent(netw: string, record: any): Promise<number> {
        const conn = await this.mysql.getConnection(netw);

        let newRecord = {
            begin_at: record.begin_at,
            end_at: record.end_at,
        }
        console.log("update parent",record, newRecord, record.old_begin_at, record.old_end_at);

        const results: number = await conn.query(`UPDATE ${APP_TABLES.PRODUCT_CAMPAIGN} SET ?  WHERE begin_at = ? and end_at=?`, [newRecord, record.old_begin_at, record.old_end_at]);

        if (!results)
            throw new Error("ProductCampaign not updated.");
        return results;
    };



    async deleteProductCampaignItem(netw: string, Id: number): Promise<number> {
        console.log("delete");
        const conn = await this.mysql.getConnection(netw);
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.PRODUCT_CAMPAIGN} WHERE Id = ${escape(Id + "")}`);

        if (!results)
            throw new Error("ProductCampaign not deleted.");
        return results;
    };

    async addProductCampaignItem(netw: string, record: CampaignType): Promise<number> {
        console.log("add");
        const conn = await this.mysql.getConnection(netw);
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.PRODUCT_CAMPAIGN} SET ?`, [record]);

        if (!results)
            throw new Error("ProductCampaign not added.");
        return results;
    };



}

