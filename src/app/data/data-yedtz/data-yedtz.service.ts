import { Injectable, Inject } from '@nestjs/common';
import { Yedtzs } from 'src/shared/types/system.types';
import { PoolConnection } from 'promise-mysql';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { MysqlService } from 'src/shared/mysql/mysql.service';


@Injectable()

export class DataYedtzService {
    @Inject(MysqlService) private readonly mysql: MysqlService;


    async getYedtzItems(netw:string): Promise<Yedtzs[]> {

        const conn = await this.mysql.getConnection(netw);
        const results: Yedtzs[] = await conn.query(`SELECT * FROM ${APP_TABLES.YEDTZ}`);

        if (!results || !results[0])
            throw new Error("yedtz types not found or empty.");
        return results;
    }
}


