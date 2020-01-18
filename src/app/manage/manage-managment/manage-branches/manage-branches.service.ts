import { Injectable, Inject } from '@nestjs/common';
import { Branch } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';

@Injectable()
export class ManageBranchesService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getBranches(netw: string): Promise<Branch[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: Branch[] = await conn.query(`SELECT * FROM ${APP_TABLES.BRANCHES}`);

        if (!results || !results[0])
            throw new Error("Branches not found or empty.");
        return results;
    }

    async getBranchById(netw: string, BranchId: number): Promise<Branch> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: Branch = await conn.query(`SELECT * FROM ${APP_TABLES.BRANCHES} WHERE BranchId = ${escape(BranchId + "")} LIMIT 1`);

        if (!results)
            throw new Error("Branches not found or empty.");
        return results;
    };

    async addBranch(netw: string, record: Branch): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.BRANCHES} SET ?`, [record]);

        if (!results)
            throw new Error("Branches not added.");
        return results;
    };

    async updateBranch(netw: string, record: Branch, BranchId: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line updated
        const results: number = await conn.query(`UPDATE ${APP_TABLES.BRANCHES} SET ?  WHERE BranchId = ?`, [record, BranchId]);

        if (!results)
            throw new Error("Branches not updated.");
        return results;
    };

    async deleteBranch(netw: string, BranchId: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line deleted
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.BRANCHES} WHERE BranchId = ${escape(BranchId + "")}`);

        if (!results)
            throw new Error("Branches not deleted.");
        return results;
    };

}

