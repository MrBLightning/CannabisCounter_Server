import { Injectable, Inject } from '@nestjs/common';
import { Supsiryun } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';

@Injectable()
export class DataSupSiryunService {
    @Inject(MysqlService) private readonly mysql: MysqlService;

    async getSupSiryuns(netw: string): Promise<Supsiryun[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: Supsiryun[] = await conn.query(`SELECT * FROM ${APP_TABLES.SUPSIRYUN}`);
        
        if (!results || !results[0])
            throw new Error("Supsiryun not found or is empty.");
        return results;

    }

    async getSupSiryunById(netw: string, id: number): Promise<Supsiryun> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: Supsiryun = await conn.query(`SELECT * FROM ${APP_TABLES.SUPSIRYUN} WHERE Id = ${escape(id + "")} LIMIT 1`);
        
        if (!results)
            throw new Error("Supsiryun not found or is empty.");
        return results;
    };
}

