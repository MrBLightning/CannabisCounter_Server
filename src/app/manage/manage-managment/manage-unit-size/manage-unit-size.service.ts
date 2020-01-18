import { Injectable, Inject } from '@nestjs/common';
import { UnitSize } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';
import { PoolConnection } from 'promise-mysql';

@Injectable()
export class ManageUnitSizeService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getUnitSizes(netw: string): Promise<UnitSize[]> {
        const conn = await this.mysql.getConnection();
        const results: UnitSize[] = await conn.query(`SELECT * FROM ${APP_TABLES.UNITSIZE}`);

        if (!results || !results[0])
            throw new Error("UnitSize not found or is empty.");
        return results;

    }

    async getUnitSizeById(netw: string, Id: number): Promise<UnitSize> {
        const conn = await this.mysql.getConnection();
        // this query returns a single line object
        const results: UnitSize = await conn.query(`SELECT * FROM ${APP_TABLES.UNITSIZE} WHERE Id = ${escape(Id + "")} LIMIT 1`);

        if (!results)
            throw new Error("UnitSize not found or is empty.");
        return results;
    };

    async addUnitSize(netw: string, record: UnitSize): Promise<number> {
        const conn = await this.mysql.getConnection();
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.UNITSIZE} SET ?`, [record]);

        if (!results)
            throw new Error("UnitSize not added.");
        return results;
    };

    async updateUnitSize(netw: string, record: UnitSize): Promise<number> {
        const conn = await this.mysql.getConnection();
        // this query returns the id of the line updated
        const results: number = await conn.query(`UPDATE ${APP_TABLES.UNITSIZE} SET ?  WHERE Id = ?`, [record, record.Id]);

        if (!results)
            throw new Error("UnitSize not updated.");
        return results;
    };

    async deleteUnitSize(netw: string, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection();
        // this query returns the id of the line deleted
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.UNITSIZE} WHERE Id = ${escape(Id + "")}`);

        if (!results)
            throw new Error("UnitSize not deleted.");
        return results;
    };

}
