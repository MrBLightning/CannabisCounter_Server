import { Injectable, Inject } from '@nestjs/common';
import { Yedm } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';

@Injectable()
export class ManageSubtitleService {
    @Inject(MysqlService) private readonly mysql: MysqlService;


    async updateYedmItem(netw: string, record: Yedm, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        const results: number = await conn.query(`UPDATE ${APP_TABLES.YEDM} SET ?  WHERE Id = ?`, [record, Id]);

        if (!results)
            throw new Error("subtitle not updated.");
        return results;
    };

    async deleteYedmItem(netw: string, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.YEDM} WHERE Id = ${escape(Id + "")}`);

        if (!results)
            throw new Error("subtitle not deleted.");
        return results;
    };

    async addYedmItem(netw: string, record: Yedm): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.YEDM} SET ?`, [record]);

        if (!results)
            throw new Error("subtitle not added.");
        return results;
    };

 

}

