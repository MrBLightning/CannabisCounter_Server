import { Injectable, Inject } from '@nestjs/common';
import { Peruk, SpecificPeruk } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';

@Injectable()
export class ManagePerukService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getPeruks(netw: string): Promise<Peruk[]> {
        const conn = await this.mysql.getConnection(netw);
        let results: Peruk[] = await conn.query(`SELECT * FROM ${APP_TABLES.PERUK}`);
        if (!results || !results[0])
            throw new Error("Peruk not found or empty.");
        return results;
    }

    async getPerukByLevel(netw: string, Level: string): Promise<Peruk[]> {
        const conn = await this.mysql.getConnection(netw);
        let results: Peruk[] = await conn.query(`SELECT * FROM ${APP_TABLES.PERUK} WHERE Level = ${escape(Level + "")}`);
        if (!results || !results[0])
            throw new Error("Peruk not found or empty.");
        return results;
    }

    async getSpecificPeruk(netw: string, record: SpecificPeruk): Promise<Peruk[]> {
        const conn = await this.mysql.getConnection(netw);
        let results: Peruk[] = await conn.query(`SELECT * FROM ${APP_TABLES.PERUK} WHERE BarCodeParent = ${escape(record.BarCodeParent + "")} 
                                                        AND Level = '${escape(record.Level + "")}'`);
        if (!results || !results[0])
            throw new Error("Peruk not found or empty.");
        return results;
    }

    async getPerukById(netw: string, Id: number): Promise<Peruk> {
        const conn = await this.mysql.getConnection(netw);
        const results: Peruk = await conn.query(`SELECT * FROM ${APP_TABLES.PERUK} WHERE Id = ${escape(Id + "")} LIMIT 1`);

        if (!results)
            throw new Error("Peruk not found or empty.");
        return results;
    };

    async addPeruk(netw: string, record: Peruk): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.PERUK} SET ?`, [record]);

        if (!results)
            throw new Error("Peruk not added.");
        return results;
    };

    async updatePeruk(netw: string, record: Peruk, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line updated
        const results: number = await conn.query(`UPDATE ${APP_TABLES.PERUK} SET ?  WHERE Id = ?`, [record, Id]);

        if (!results)
            throw new Error("Peruk not updated.");
        return results;
    };

    async deletePeruk(netw: string, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line deleted
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.PERUK} WHERE Id = ${escape(Id + "")}`);

        if (!results)
            throw new Error("Peruk not deleted.");
        return results;
    };

}

