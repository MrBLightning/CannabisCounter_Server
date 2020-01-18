import { Injectable, Inject } from '@nestjs/common';
import { Siba } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';

@Injectable()
export class ManageSibasService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getSibas(netw: string): Promise<Siba[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: Siba[] = await conn.query(`SELECT * FROM ${APP_TABLES.SIBA}`);

        if (!results || !results[0])
            throw new Error("Siba not found or empty.");
        return results;
    }

    async getSibaById(netw: string, Id: number): Promise<Siba> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: Siba = await conn.query(`SELECT * FROM ${APP_TABLES.SIBA} WHERE Id = ${escape(Id + "")} LIMIT 1`);

        if (!results)
            throw new Error("Siba not found or empty.");
        return results;
    };

    async addSiba(netw: string, record: Siba): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.SIBA} SET ?`, [record]);

        if (!results)
            throw new Error("DordSibaer not added.");
        return results;
    };

    async updateSiba(netw: string, record: Siba, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line updated
        const results: number = await conn.query(`UPDATE ${APP_TABLES.SIBA} SET ?  WHERE Id = ?`, [record, Id]);

        if (!results)
            throw new Error("Siba not updated.");
        return results;
    };

    async deleteSiba(netw: string, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line deleted
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.SIBA} WHERE Id = ${escape(Id + "")}`);

        if (!results)
            throw new Error("Siba not deleted.");
        return results;
    };

}

