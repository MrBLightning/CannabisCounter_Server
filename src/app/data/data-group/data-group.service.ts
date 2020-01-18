import { Injectable, Inject } from '@nestjs/common';
import { Group } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';

@Injectable()
export class DataGroupService {
    @Inject(MysqlService) private readonly mysql: MysqlService;

    async getGroups(netw: string): Promise<Group[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: Group[] = await conn.query(`SELECT * FROM ${APP_TABLES.GROUPS}`);
        
        if (!results || !results[0])
            throw new Error("Group not found or is empty.");
        return results;

    }

    async getGroupById(netw: string, id: number): Promise<Group> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: Group = await conn.query(`SELECT * FROM ${APP_TABLES.GROUPS} WHERE Id = ${escape(id + "")} LIMIT 1`);
        
        if (!results)
            throw new Error("Group not found or is empty.");
        return results;
    };
}
