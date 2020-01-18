import { Injectable, Inject } from '@nestjs/common';
import { Supsiryun } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';

@Injectable()
export class ManageSupsiryunService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getSupsiryuns(netw: string): Promise<Supsiryun[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: Supsiryun[] = await conn.query(`SELECT * FROM ${APP_TABLES.SUPSIRYUN}`);

        if (!results || !results[0])
            throw new Error("Supsiryun not found or empty.");
        return results;
    }

    async getSupsiryunById(netw: string, Id: number): Promise<Supsiryun> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: Supsiryun = await conn.query(`SELECT * FROM ${APP_TABLES.SUPSIRYUN} WHERE Id = ${escape(Id + "")} LIMIT 1`);

        if (!results)
            throw new Error("Supsiryun not found or empty.");
        return results;
    };

    async addSupsiryun(netw: string, record: Supsiryun): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.SUPSIRYUN} SET ?`, [record]);

        if (!results)
            throw new Error("Supsiryun not added.");
        return results;
    };

    async updateSupsiryun(netw: string, record: Supsiryun, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line updated
        const results: number = await conn.query(`UPDATE ${APP_TABLES.SUPSIRYUN} SET ?  WHERE Id = ?`, [record, Id]);

        if (!results)
            throw new Error("Supsiryun not updated.");
        return results;
    };

    async deleteSupsiryun(netw: string, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line deleted
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.BRANCHES} WHERE Id = ${escape(Id + "")}`);

        if (!results)
            throw new Error("Supsiryun not deleted.");
        return results;
    };

}

