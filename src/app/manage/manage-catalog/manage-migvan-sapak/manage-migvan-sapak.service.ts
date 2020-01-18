import { Injectable, Inject } from '@nestjs/common';
import { MigvanSapak } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';

@Injectable()
export class ManageMigvanSapakService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getMigvanSapakim(netw: string): Promise<MigvanSapak[]> {
        const conn = await this.mysql.getConnection(netw);
        let results: MigvanSapak[] = await conn.query(`SELECT * FROM ${APP_TABLES.MIGVANSAPAK}`);
        if (!results || !results[0])
            throw new Error("Migvan Sapak not found or empty.");
        return results;
    }

    async getMigvanSapakById(netw: string, Id: number): Promise<MigvanSapak> {
        const conn = await this.mysql.getConnection(netw);
        const results: MigvanSapak = await conn.query(`SELECT * FROM ${APP_TABLES.MIGVANSAPAK} WHERE Id = ${escape(Id + "")} LIMIT 1`);

        if (!results)
            throw new Error("Migvan Sapak not found or empty.");
        return results;
    };

    async addMigvanSapak(netw: string, record: MigvanSapak): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.MIGVANSAPAK} SET ?`, [record]);

        if (!results)
            throw new Error("Migvan Sapak not added.");
        return results;
    };

    async updateMigvanSapak(netw: string, record: MigvanSapak, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line updated
        const results: number = await conn.query(`UPDATE ${APP_TABLES.MIGVANSAPAK} SET ?  WHERE Id = ?`, [record, Id]);

        if (!results)
            throw new Error("Migvan Sapak not updated.");
        return results;
    };

    async deleteMigvanSapak(netw: string, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line deleted
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.MIGVANSAPAK} WHERE Id = ${escape(Id + "")}`);

        if (!results)
            throw new Error("Migvan Sapak not deleted.");
        return results;
    };

}

