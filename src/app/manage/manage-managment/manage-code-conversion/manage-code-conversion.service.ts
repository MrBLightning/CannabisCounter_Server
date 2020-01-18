import { Injectable, Inject } from '@nestjs/common';
import { CodeConversion } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';

@Injectable()
export class ManageCodeConversionService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getCodeConversions(netw: string): Promise<CodeConversion[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: CodeConversion[] = await conn.query(`SELECT * FROM ${APP_TABLES.CODECONVERSION}`);

        if (!results || !results[0])
            throw new Error("CodeConversion not found or empty.");
        return results;
    }

    async getCodeConversionById(netw: string, Code: number): Promise<CodeConversion> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: CodeConversion = await conn.query(`SELECT * FROM ${APP_TABLES.CODECONVERSION} WHERE Code = ${escape(Code + "")} LIMIT 1`);

        if (!results)
            throw new Error("CodeConversion not found or empty.");
        return results;
    };

    async addCodeConversion(netw: string, record: CodeConversion): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.CODECONVERSION} SET ?`, [record]);

        if (!results)
            throw new Error("CodeConversion not added.");
        return results;
    };

    async updateCodeConversion(netw: string, record: CodeConversion, Code: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line updated
        const results: number = await conn.query(`UPDATE ${APP_TABLES.CODECONVERSION} SET ?  WHERE Code = ?`, [record, Code]);

        if (!results)
            throw new Error("CodeConversion not updated.");
        return results;
    };

    async deleteCodeConversion(netw: string, Code: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line deleted
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.CODECONVERSION} WHERE Code = ${escape(Code + "")}`);

        if (!results)
            throw new Error("CodeConversion not deleted.");
        return results;
    };

}

