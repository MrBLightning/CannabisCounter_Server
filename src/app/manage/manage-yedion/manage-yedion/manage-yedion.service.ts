import { Injectable, Inject } from '@nestjs/common';
import { YedionType } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';

@Injectable()
export class ManageYedionService {
    @Inject(MysqlService) private readonly mysql: MysqlService;


    async updateYedionItem(netw: string, record: YedionType, Id: number): Promise<number> {
        console.log("update");
        const conn = await this.mysql.getConnection(netw);
        const results: number = await conn.query(`UPDATE ${APP_TABLES.YEDION} SET ?  WHERE Id = ?`, [record, Id]);

        if (!results)
            throw new Error("yedion not updated.");
        return results;
    };

    async deleteYedionItem(netw: string, Id: number): Promise<number> {
        console.log("delete");
        const conn = await this.mysql.getConnection(netw);
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.YEDION} WHERE Id = ${escape(Id + "")}`);

        if (!results)
            throw new Error("yedion not deleted.");
        return results;
    };

    async addYedionItem(netw: string, record: YedionType): Promise<number> {
        console.log("add");
        const conn = await this.mysql.getConnection(netw);
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.YEDION} SET ?`, [record]);

        if (!results)
            throw new Error("yedion not added.");
        return results;
    };

 

}

