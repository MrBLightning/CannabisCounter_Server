import { Injectable, Inject } from '@nestjs/common';
import { YedionType } from 'src/shared/types/system.types';
import { PoolConnection } from 'promise-mysql';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { MysqlService } from 'src/shared/mysql/mysql.service';


@Injectable()

export class DataYedionService {
    @Inject(MysqlService) private readonly mysql: MysqlService;


    async getYedion(netw: string): Promise<YedionType[]> {
        console.log("yedion")
        const conn = await this.mysql.getConnection(netw);
        const results: YedionType[] = await conn.query(`SELECT * FROM ${APP_TABLES.YEDION}`);

        if (!results || !results[0])
            throw new Error("yedion types not found or empty.");
        return results;
    }
}


