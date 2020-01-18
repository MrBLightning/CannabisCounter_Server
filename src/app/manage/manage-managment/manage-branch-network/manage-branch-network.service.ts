import { Injectable, Inject } from '@nestjs/common';
import { BranchNetwork } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';
import { PoolConnection } from 'promise-mysql';

@Injectable()
export class ManageBranchNetworkService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getBranchNetworks(netw: string): Promise<BranchNetwork[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: BranchNetwork[] = await conn.query(`SELECT * FROM ${APP_TABLES.BRANCHNETWORK}`);

        if (!results || !results[0])
            throw new Error("BranchNetwork not found or is empty.");
        return results;

    }

    async getBranchNetworkById(netw: string, Id: number): Promise<BranchNetwork> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: BranchNetwork = await conn.query(`SELECT * FROM ${APP_TABLES.BRANCHNETWORK} WHERE Id = ${escape(Id + "")} LIMIT 1`);

        if (!results)
            throw new Error("BranchNetwork not found or is empty.");
        return results;
    };

    async addBranchNetwork(netw: string, record: BranchNetwork): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.BRANCHNETWORK} SET ?`, [record]);

        if (!results)
            throw new Error("BranchNetwork not added.");
        return results;
    };

    async updateBranchNetwork(netw: string, record: BranchNetwork): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line updated
        const results: number = await conn.query(`UPDATE ${APP_TABLES.BRANCHNETWORK} SET ?  WHERE Id = ?`, [record, record.Id]);

        if (!results)
            throw new Error("BranchNetwork not updated.");
        return results;
    };

    async deleteBranchNetwork(netw: string, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line deleted
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.BRANCHNETWORK} WHERE Id = ${escape(Id + "")}`);

        if (!results)
            throw new Error("BranchNetwork not deleted.");
        return results;
    };

}
