import { Injectable, Inject } from '@nestjs/common';
import { Branch } from 'src/shared/types/system.types';
import { PoolConnection } from 'promise-mysql';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { MysqlService } from 'src/shared/mysql/mysql.service';

@Injectable()
export class DataBranchService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getBranches(netw:string): Promise<Branch[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: Branch[] = await conn.query(`SELECT * FROM ${APP_TABLES.BRANCHES}`);
        
        if (!results || !results[0])
            throw new Error("Branches not found or empty.");
        return results;

    }

    async getBranchById(netw:string, BranchId: number): Promise<Branch> {
        const conn = await this.mysql.getConnection(netw);
        const results: Branch = await conn.query(`SELECT * FROM ${APP_TABLES.BRANCHES} WHERE BranchId = ${escape(BranchId + "")} LIMIT 1`);
        
        if (!results)
            throw new Error("Branches not found or is empty.");
        return results;
    };
}
