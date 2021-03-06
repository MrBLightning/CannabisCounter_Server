import { Injectable, Inject } from '@nestjs/common';
import { Yedmivs } from 'src/shared/types/system.types';
import { PoolConnection } from 'promise-mysql';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { MysqlService } from 'src/shared/mysql/mysql.service';


@Injectable()

export class DataYedmivService {
    @Inject(MysqlService) private readonly mysql: MysqlService;


    async getYedmivItems(netw:string): Promise<Yedmivs[]> {

        const conn = await this.mysql.getConnection(netw);
        const results: Yedmivs[] = await conn.query(`SELECT * FROM ${APP_TABLES.YEDMIV}`);

        if (!results || !results[0])
            throw new Error("yedmiv types not found or empty.");
        return results;
    }
}


