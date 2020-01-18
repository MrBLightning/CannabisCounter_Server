import { Injectable, Inject } from '@nestjs/common';
import { Siba } from 'src/shared/types/system.types';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';
import { MysqlService } from 'src/shared/mysql/mysql.service';

@Injectable()
export class DataSibaService {
    @Inject(MysqlService) private readonly mysql: MysqlService;

    async getSibas(netw: string): Promise<Siba[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: Siba[] = await conn.query(`SELECT * FROM ${APP_TABLES.SIBA}`);

        if (!results || !results[0])
            throw new Error("Siba items not found or empty.");
        return results;

    }

    async getSibaById(netw: string, Id: number): Promise<Siba> {
        const conn = await this.mysql.getConnection(netw);
        const results: Siba = await conn.query(`SELECT * FROM ${APP_TABLES.SIBA} WHERE Id = ${escape(Id + "")} LIMIT 1`);

        if (!results)
            throw new Error("Siba item not found or is empty.");
        return results;
    };

}
