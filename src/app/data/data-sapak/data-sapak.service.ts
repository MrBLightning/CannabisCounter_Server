import { Injectable, Inject } from '@nestjs/common';
import { Sapak } from 'src/shared/types/system.types';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';
import { PoolConnection } from 'promise-mysql';
import { MysqlService } from 'src/shared/mysql/mysql.service';

@Injectable()
export class DataSapakService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getSapaks(netw: string): Promise<Sapak[]> {
        const conn = await this.mysql.getConnection(netw);
        
        const results: Sapak[] = await conn.query(`SELECT * FROM ${APP_TABLES.SUPPLIERS}`);

        if (!results || !results[0])
            throw new Error("Sapak not found or empty.");
        return results;

    }

    async getSapakById(netw: string, Id: number): Promise<Sapak> {
        const conn = await this.mysql.getConnection(netw);
        const results: Sapak = await conn.query(`SELECT * FROM ${APP_TABLES.SUPPLIERS} WHERE Id = ${escape(Id + "")} LIMIT 1`);

        if (!results)
            throw new Error("Sapak not found or is empty.");
        return results;
    };
}
