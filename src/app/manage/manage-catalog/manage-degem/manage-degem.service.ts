import { Injectable, Inject } from '@nestjs/common';
import { Degem } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';

@Injectable()
export class ManageDegemService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;


    async getDegems(netw: string): Promise<Degem[]> {
        const conn = await this.mysql.getConnection(netw);
        const departments: Degem[] = await conn.query(`SELECT * FROM ${APP_TABLES.SERIES}`);
        
        if (!departments || !departments[0])
            throw new Error("Degems not found or empty.");
        return departments;

    }

    async getDegemById(netw: string, id: number): Promise<Degem> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: Degem = await conn.query(`SELECT * FROM ${APP_TABLES.SERIES} WHERE Id = ${escape(id + "")} LIMIT 1`);
        
        if (!results)
            throw new Error("Degems not found or empty.");
        return results;
    };

    async addDegem(netw: string, record: Degem): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.SERIES} SET ?`, [record]);
        
        if (!results)
            throw new Error("Degems not added.");
        return results;
    };

    async updateDegem(netw: string, record: Degem, id: number ): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line updated
        const results: number = await conn.query(`UPDATE ${APP_TABLES.SERIES} SET ?  WHERE Id = ?`, [record, id]);
        
        if (!results)
            throw new Error("Degems not updated.");
        return results;
    };

    async deleteDegem(netw: string, id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line deleted
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.SERIES} WHERE Id = ${escape(id + "")}`);
        
        if (!results)
            throw new Error("Degems not deleted.");
        return results;
    };

}
