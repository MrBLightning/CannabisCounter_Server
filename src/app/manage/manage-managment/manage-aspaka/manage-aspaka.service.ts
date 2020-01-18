import { Injectable, Inject } from '@nestjs/common';
import { AspakaRecord } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';

@Injectable()
export class ManageAspakaService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getAspakaRecords(netw: string): Promise<AspakaRecord[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: AspakaRecord[] = await conn.query(`SELECT * FROM ${APP_TABLES.ASPAKA}`);

        if (!results || !results[0])
            throw new Error("Aspaka not found or empty.");
        return results;
    }

    async getAspakaById(netw: string, Id: number): Promise<AspakaRecord> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: AspakaRecord = await conn.query(`SELECT * FROM ${APP_TABLES.ASPAKA} WHERE Id = ${escape(Id + "")} LIMIT 1`);

        if (!results)
            throw new Error("Aspaka not found or empty.");
        return results;
    };

    async addAspaka(netw: string, record: AspakaRecord): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.ASPAKA} SET ?`, [record]);

        if (!results)
            throw new Error("Aspaka not added.");
        return results;
    };

    async updateAspaka(netw: string, record: AspakaRecord, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line updated
        const results: number = await conn.query(`UPDATE ${APP_TABLES.ASPAKA} SET ?  WHERE Id = ?`, [record, Id]);

        if (!results)
            throw new Error("Aspaka not updated.");
        return results;
    };

    async deleteAspaka(netw: string, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line deleted
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.ASPAKA} WHERE Id = ${escape(Id + "")}`);

        if (!results)
            throw new Error("Aspaka not deleted.");
        return results;
    };
}

