import { Injectable, Inject } from '@nestjs/common';
import { Siryun, SiryunUpdate, SiryunWhere, SiryunBuild } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';
import moment = require('moment');
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';

@Injectable()
export class OrderReserveFishService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getSiryuns(netw: string): Promise<Siryun[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: Siryun[] = await conn.query(`SELECT * FROM ${APP_TABLES.SIRYUN}`);

        if (!results || !results[0])
            throw new Error("Siryun not found or empty.");
        return results;
    }

    async getSiryunByDate(netw: string, CreateDate: string): Promise<Siryun[]> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: Siryun[] = await conn.query(`SELECT * FROM ${APP_TABLES.SIRYUN} WHERE CreateDate=?`, [CreateDate]);

        if (!results)
            throw new Error("Siryun not found or empty.");
        return results;
    };

    async addSiryun(netw: string, record: SiryunBuild): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.SIRYUN} SET ?`, [record]);

        if (!results)
            throw new Error("Siryun not added.");
        return results;
    };

    async updateSiryun(netw: string, recordWhere: SiryunWhere, record: SiryunUpdate): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line updated
        const results: number = await conn.query(`UPDATE ${APP_TABLES.SIRYUN} SET SapakSiryun=? WHERE BarCode=? AND CreateDate=? AND SapakId=?`,
            [record.SapakSiryun, recordWhere.BarCode, recordWhere.CreateDate, recordWhere.SapakId]);

        if (!results)
            throw new Error("Siryun not updated.");
        return results;
    };

    async deleteSiryun(netw: string, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line deleted
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.SIRYUN} WHERE Id = ${escape(Id + "")}`);

        if (!results)
            throw new Error("Siryun not deleted.");
        return results;
    };

}

