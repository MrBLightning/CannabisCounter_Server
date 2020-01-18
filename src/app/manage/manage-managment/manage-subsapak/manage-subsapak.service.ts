import { Injectable, Inject } from '@nestjs/common';
import { Sapak, Subsapak } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';

@Injectable()
export class ManageSubsapakService {
    // addSubapak(netw: string, record: any) {
    //     throw new Error("Method not implemented.");
    // }
    @Inject(MysqlService) private readonly mysql: MysqlService;

    async getSubsapakim(netw: string): Promise<Subsapak[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: Subsapak[] = await conn.query(`SELECT * FROM ${APP_TABLES.SUBSAPAKS}`);
        
        if (!results || !results[0])
            throw new Error("Subsapaks not found or is empty.");
        return results;

    }

    async getSubsapakById(netw: string, id: number): Promise<Subsapak> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: Subsapak = await conn.query(`SELECT * FROM ${APP_TABLES.SUBSAPAKS} WHERE Id = ${escape(id + "")} LIMIT 1`);
        
        if (!results)
            throw new Error("Subsapaks not found or is empty.");
        return results;
    };

    async addSubsapak(netw: string, record: Subsapak): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.SUBSAPAKS} SET ?`, [record]);
        
        if (!results)
            throw new Error("Subsapaks not added.");
        return results;
    };

    async updateSubsapak(netw: string, record: Subsapak): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line updated
        const results: number = await conn.query(`UPDATE ${APP_TABLES.SUBSAPAKS} SET ?  WHERE Id = ?`, [record, record.Id]);
        
        if (!results)
            throw new Error("Subsapaks not updated.");
        return results;
    };

    async deleteSubsapak(netw: string, id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line deleted
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.SUBSAPAKS} WHERE Id = ${escape(id + "")}`);
        
        if (!results)
            throw new Error("Subsapaks not deleted.");
        return results;
    };

}
