import { Injectable, Inject } from '@nestjs/common';
import { Subbar } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';

@Injectable()
export class ManageSubbargeneralService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getSubbars(): Promise<Subbar[]> {
        // calling mysql.getConnection empty connects to the default netw - Admin
        const conn = await this.mysql.getConnection();
        let results: Subbar[] = await conn.query(`SELECT * FROM ${APP_TABLES.SUBBARGENERAL}`);
        if (!results || !results[0])
            throw new Error("Subbar general not found or empty.");
        return results;
    }

    async getSubbarById(Id: number): Promise<Subbar> {
        // calling mysql.getConnection empty connects to the default netw - Admin
        const conn = await this.mysql.getConnection();
        const results: Subbar = await conn.query(`SELECT * FROM ${APP_TABLES.SUBBARGENERAL} WHERE Id = ${escape(Id + "")} LIMIT 1`);

        if (!results)
            throw new Error("Subbar general not found or empty.");
        return results;
    };

    async addSubbar(record: Subbar): Promise<number> {
        // this query returns the id of the new line created
        const conn = await this.mysql.getConnection();
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.SUBBARGENERAL} SET ?`, [record]);

        if (!results)
            throw new Error("Subbar general not added.");
        return results;
    };

    async updateSubbar(record: Subbar, Id: number): Promise<number> {
        // this query returns the id of the line updated
        const conn = await this.mysql.getConnection();
        const results: number = await conn.query(`UPDATE ${APP_TABLES.SUBBARGENERAL} SET ?  WHERE Id = ?`, [record, Id]);

        if (!results)
            throw new Error("Subbar general not updated.");
        return results;
    };

    async deleteSubbar(Id: number): Promise<number> {
        // this query returns the id of the line deleted
        const conn = await this.mysql.getConnection();
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.SUBBARGENERAL} WHERE Id = ${escape(Id + "")}`);

        if (!results)
            throw new Error("Subbar not deleted.");
        return results;
    };

}

