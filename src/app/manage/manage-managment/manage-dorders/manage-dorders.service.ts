import { Injectable, Inject } from '@nestjs/common';
import { Dorder } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';

@Injectable()
export class ManageDordersService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getDorders(netw: string): Promise<Dorder[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: Dorder[] = await conn.query(`SELECT * FROM ${APP_TABLES.DORDER}`);

        if (!results || !results[0])
            throw new Error("Dorder not found or empty.");
        return results;
    }

    async getDorderById(netw: string, Id: number): Promise<Dorder> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: Dorder = await conn.query(`SELECT * FROM ${APP_TABLES.DORDER} WHERE Id = ${escape(Id + "")} LIMIT 1`);

        if (!results)
            throw new Error("Dorder not found or empty.");
        return results;
    };

    async addDorder(netw: string, record: Dorder): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.DORDER} SET ?`, [record]);

        if (!results)
            throw new Error("Dorder not added.");
        return results;
    };

    async updateDorder(netw: string, record: Dorder, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line updated
        const results: number = await conn.query(`UPDATE ${APP_TABLES.DORDER} SET ?  WHERE Id = ?`, [record, Id]);

        if (!results)
            throw new Error("Dorder not updated.");
        return results;
    };

    async deleteDorder(netw: string, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line deleted
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.DORDER} WHERE Id = ${escape(Id + "")}`);

        if (!results)
            throw new Error("Dorder not deleted.");
        return results;
    };

}

