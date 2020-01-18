import { Injectable, Inject } from '@nestjs/common';
import { Yedm } from 'src/shared/types/system.types';
import { PoolConnection } from 'promise-mysql';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { MysqlService } from 'src/shared/mysql/mysql.service';


@Injectable()

export class DataSubtitleService {
    @Inject(MysqlService) private readonly mysql: MysqlService;


    async getYedmItems(netw:string): Promise<Yedm[]> {

        const conn = await this.mysql.getConnection(netw);
        const results: Yedm[] = await conn.query(`SELECT * FROM ${APP_TABLES.YEDM}`);
        console.log("getYedmItems2",results)

        if (!results || !results[0])
            throw new Error("Branch types not found or empty.");
        return results;
    }
}


