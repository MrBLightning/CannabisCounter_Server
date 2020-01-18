import { Injectable, Inject } from '@nestjs/common';
import { Yeds } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';

@Injectable()
export class ManageYedService {
    @Inject(MysqlService) private readonly mysql: MysqlService;


    async updateYedItem(netw: string, record: Yeds, Id: number): Promise<number> {
        console.log("update");
        const conn = await this.mysql.getConnection(netw);
        const results: number = await conn.query(`UPDATE ${APP_TABLES.YED} SET ?  WHERE Id = ?`, [record, Id]);

        if (!results)
            throw new Error("yed not updated.");
        return results;
    };

    async deleteYedItem(netw: string, Id: number): Promise<number> {
        console.log("delete");
        const conn = await this.mysql.getConnection(netw);
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.YED} WHERE Id = ${escape(Id + "")}`);

        if (!results)
            throw new Error("yed not deleted.");
        return results;
    };

    async addYedItem(netw: string, record: Yeds): Promise<number> {
        console.log("add");
        const conn = await this.mysql.getConnection(netw);
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.YED} SET ?`, [record]);

        if (!results)
            throw new Error("yed not added.");
        return results;
    };

 

}

