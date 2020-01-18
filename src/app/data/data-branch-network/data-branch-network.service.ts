import { Injectable, Inject } from '@nestjs/common';
import { BranchNetwork } from 'src/shared/types/system.types';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';
import { MysqlService } from 'src/shared/mysql/mysql.service';

@Injectable()
export class DataBranchNetworkService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
 
    async getBranchNetworks(netw:string): Promise<BranchNetwork[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: BranchNetwork[] = await conn.query(`SELECT * FROM ${APP_TABLES.BRANCHNETWORK}`);
        
        if (!results || !results[0])
            throw new Error("BranchNetwork not found or empty.");
        return results;
    }
}
