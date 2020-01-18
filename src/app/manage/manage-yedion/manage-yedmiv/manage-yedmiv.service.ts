import { Injectable, Inject } from '@nestjs/common';
import { Yedmivs } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';

@Injectable()
export class ManageYedmivService {
    @Inject(MysqlService) private readonly mysql: MysqlService;


    async updateYedmivItem(netw: string, record: Yedmivs, Id: number): Promise<number> {
        console.log("update");
        const conn = await this.mysql.getConnection(netw);
        const results: number = await conn.query(`UPDATE ${APP_TABLES.YEDMIV} SET ?  WHERE Id = ?`, [record, Id]);

        if (!results)
            throw new Error("yedmiv not updated.");
        return results;
    };

    async deleteYedmivItem(netw: string, Id: number): Promise<number> {
        console.log("delete");
        const conn = await this.mysql.getConnection(netw);
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.YEDMIV} WHERE Id = ${escape(Id + "")}`);

        if (!results)
            throw new Error("yedmiv not deleted.");
        return results;
    };

    async addYedmivItem(netw: string, record: Yedmivs): Promise<number> {
        console.log("add");
        const conn = await this.mysql.getConnection(netw);
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.YEDMIV} SET ?`, [record]);

        if (!results)
            throw new Error("yedmiv not added.");
        return results;
    };

 

}

