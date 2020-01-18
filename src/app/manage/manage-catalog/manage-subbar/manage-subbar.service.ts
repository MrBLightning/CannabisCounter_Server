import { Injectable, Inject } from '@nestjs/common';
import { Subbar } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';

@Injectable()
export class ManageSubbarService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getSubbars(netw: string): Promise<Subbar[]> {
        const conn = await this.mysql.getConnection(netw);
        let results: Subbar[] = await conn.query(`SELECT * FROM ${APP_TABLES.SUBBAR}`);
        if (!results || !results[0])
            throw new Error("Subbar not found or empty.");
        return results;
    }

    async getSubbarById(netw: string, Id: number): Promise<Subbar> {
        const conn = await this.mysql.getConnection(netw);
        const results: Subbar = await conn.query(`SELECT * FROM ${APP_TABLES.SUBBAR} WHERE Id = ${escape(Id + "")} LIMIT 1`);

        if (!results)
            throw new Error("Subbar not found or empty.");
        return results;
    };

    async addSubbar(netw: string, record: Subbar): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.SUBBAR} SET ?`, [record]);

        if (!results)
            throw new Error("Subbar not added.");
        return results;
    };

    async updateSubbar(netw: string, record: Subbar, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line updated
        const results: number = await conn.query(`UPDATE ${APP_TABLES.SUBBAR} SET ?  WHERE Id = ?`, [record, Id]);

        if (!results)
            throw new Error("Subbar not updated.");
        return results;
    };

    async deleteSubbar(netw: string, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line deleted
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.SUBBAR} WHERE Id = ${escape(Id + "")}`);

        if (!results)
            throw new Error("Subbar not deleted.");
        return results;
    };

}

