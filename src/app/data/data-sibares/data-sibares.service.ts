import { Injectable, Inject } from '@nestjs/common';
import { SibaRes } from 'src/shared/types/system.types';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';
import { PoolConnection } from 'promise-mysql';
import { MysqlService } from 'src/shared/mysql/mysql.service';

@Injectable()
export class DataSibaresService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getSibaRes(netw: string): Promise<SibaRes[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: SibaRes[] = await conn.query(`SELECT * FROM ${APP_TABLES.SIBARES}`);

        if (!results || !results[0])
            throw new Error("SibaRes items not found or empty.");
        return results;

    }

    async getSibaResById(netw: string, Id: number): Promise<SibaRes> {
        const conn = await this.mysql.getConnection(netw);
        const results: SibaRes = await conn.query(`SELECT * FROM ${APP_TABLES.SIBARES} WHERE Id = ${escape(Id + "")} LIMIT 1`);

        if (!results)
            throw new Error("SibaRes item not found or is empty.");
        return results;
    };

}
