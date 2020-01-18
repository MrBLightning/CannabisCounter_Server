import { Injectable, Inject } from '@nestjs/common';
import { Yedtzs } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';

@Injectable()
export class ManageYedtzService {
    @Inject(MysqlService) private readonly mysql: MysqlService;


    async updateYedtzItem(netw: string, record: Yedtzs, Id: number): Promise<number> {
        console.log("tz update");
        const conn = await this.mysql.getConnection(netw);
        const results: number = await conn.query(`UPDATE ${APP_TABLES.YEDTZ} SET ?  WHERE Id = ?`, [record, Id]);

        if (!results)
            throw new Error("yedtz not updated.");
        return results;
    };

    async deleteYedtzItem(netw: string, Id: number): Promise<number> {
        console.log("tz delete");
        const conn = await this.mysql.getConnection(netw);
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.YEDTZ} WHERE Id = ${escape(Id + "")}`);

        if (!results)
            throw new Error("yedtz not deleted.");
        return results;
    };

    async addYedtzItem(netw: string, record: Yedtzs): Promise<number> {
        console.log("tz add");
        const conn = await this.mysql.getConnection(netw);
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.YEDTZ} SET ?`, [record]);

        if (!results)
            throw new Error("yedtz not added.");
        return results;
    };

 

}

