import { Injectable, Inject } from '@nestjs/common';
import { Yeds } from 'src/shared/types/system.types';
import { PoolConnection } from 'promise-mysql';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { MysqlService } from 'src/shared/mysql/mysql.service';


@Injectable()

export class DataYedService {
    @Inject(MysqlService) private readonly mysql: MysqlService;


    async getYedItems(netw: string): Promise<Yeds[]> {
        console.log("yed get")
        const conn = await this.mysql.getConnection(netw);
        const results: Yeds[] = await conn.query(`SELECT * FROM ${APP_TABLES.YED}`);

        if (!results || !results[0])
            throw new Error("yed types not found or empty.");
        return results;
    }
}


