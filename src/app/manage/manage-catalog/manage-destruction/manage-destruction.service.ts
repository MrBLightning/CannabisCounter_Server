import { Injectable, Inject } from '@nestjs/common';
import { Destruction } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';

@Injectable()
export class ManageDestructionService {
    @Inject(MysqlService) private readonly mysql: MysqlService;

    // async getGroups(netw: string): Promise<Group[]> {
    //     const conn = await this.mysql.getConnection(netw);
    //     const results: Group[] = await conn.query(`SELECT * FROM ${APP_TABLES.GROUPS}`);
        
    //     if (!results || !results[0])
    //         throw new Error("Groups not found or is empty.");
    //     return results;

    // }

    // async getGroupById(netw: string, id: number): Promise<Group> {
    //     const conn = await this.mysql.getConnection(netw);
    //     // this query returns a single line object
    //     const results: Group = await conn.query(`SELECT * FROM ${APP_TABLES.GROUPS} WHERE Id = ${escape(id + "")} LIMIT 1`);
        
    //     if (!results)
    //         throw new Error("Group not found or is empty.");
    //     return results;
    // };

    async addDestruction(netw: string, record: Destruction): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.DESTRUCTION} SET ?`, [record]);
        
        if (!results)
            throw new Error("Destruction not added.");
        return results;
    };

    // async updateGroup(netw: string, record: Group): Promise<number> {
    //     const conn = await this.mysql.getConnection(netw);
    //     // this query returns the id of the line updated
    //     const results: number = await conn.query(`UPDATE ${APP_TABLES.GROUPS} SET ?  WHERE Id = ?`, [record, record.Id]);
        
    //     if (!results)
    //         throw new Error("Group not updated.");
    //     return results;
    // };

    // async deleteGroup(netw: string, id: number): Promise<number> {
    //     const conn = await this.mysql.getConnection(netw);
    //     // this query returns the id of the line deleted
    //     const results: number = await conn.query(`DELETE FROM ${APP_TABLES.GROUPS} WHERE Id = ${escape(id + "")}`);
        
    //     if (!results)
    //         throw new Error("Group not deleted.");
    //     return results;
    // };

}
