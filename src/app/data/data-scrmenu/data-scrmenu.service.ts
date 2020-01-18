import { Injectable, Inject } from '@nestjs/common';
import { Scrmenu } from 'src/shared/types/system.types';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';
import { PoolConnection } from 'promise-mysql';
import { MysqlService } from 'src/shared/mysql/mysql.service';

@Injectable()
export class DataScrmenuService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getScrmenus(netw: string): Promise<Scrmenu[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: Scrmenu[] = await conn.query(`SELECT * FROM ${APP_TABLES.SCRMENU}`);

        if (!results || !results[0])
            throw new Error("Scrmenu items not found or empty.");
        return results;

    }

    async getScrmenuById(netw: string, Id: number): Promise<Scrmenu> {
        const conn = await this.mysql.getConnection(netw);
        const results: Scrmenu = await conn.query(`SELECT * FROM ${APP_TABLES.SCRMENU} WHERE Id = ${escape(Id + "")} LIMIT 1`);

        if (!results)
            throw new Error("Scrmenu item not found or is empty.");
        return results;
    };

}
