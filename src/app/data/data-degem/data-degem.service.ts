import { Injectable, Inject } from '@nestjs/common';
import { Degem } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';

@Injectable()
export class DataDegemService {
    @Inject(MysqlService) private readonly mysql: MysqlService;

    async getDegems(netw: string): Promise<Degem[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: Degem[] = await conn.query(`SELECT * FROM ${APP_TABLES.SERIES}`);
        
        if (!results || !results[0])
            throw new Error("Degem not found or is empty.");
        return results;

    }

    async getDegemById(netw: string, id: number): Promise<Degem> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: Degem = await conn.query(`SELECT * FROM ${APP_TABLES.SERIES} WHERE Id = ${escape(id + "")} LIMIT 1`);
        
        if (!results)
            throw new Error("Degem not found or is empty.");
        return results;
    };
}
