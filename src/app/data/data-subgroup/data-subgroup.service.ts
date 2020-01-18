import { Injectable, Inject } from '@nestjs/common';
import { Subgroup } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';

@Injectable()
export class DataSubgroupService {
    @Inject(MysqlService) private readonly mysql: MysqlService;

    async getSubgroups(netw: string): Promise<Subgroup[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: Subgroup[] = await conn.query(`SELECT * FROM ${APP_TABLES.SUBGROUPS}`);
        
        if (!results || !results[0])
            throw new Error("Subgroup not found or is empty.");
        return results;

    }

    async getSubgroupById(netw: string, id: number): Promise<Subgroup> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: Subgroup = await conn.query(`SELECT * FROM ${APP_TABLES.SUBGROUPS} WHERE Id = ${escape(id + "")} LIMIT 1`);
        
        if (!results)
            throw new Error("Subgroup not found or is empty.");
        return results;
    };
}
