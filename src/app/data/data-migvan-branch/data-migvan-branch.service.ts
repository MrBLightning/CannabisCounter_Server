import { Injectable, Inject } from '@nestjs/common';
import { MigvanBranch } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';

@Injectable()
export class DataMigvanBranchService {
    @Inject(MysqlService) private readonly mysql: MysqlService;

    async getMigvanBranchs(netw: string): Promise<MigvanBranch[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: MigvanBranch[] = await conn.query(`SELECT * FROM ${APP_TABLES.MIGVANBRANCH}`);
        
        if (!results || !results[0])
            throw new Error("Migvan branch not found or is empty.");
        return results;

    }

    async getMigvanBranchById(netw: string, BranchId: number): Promise<MigvanBranch[]> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: MigvanBranch[] = await conn.query(`SELECT * FROM ${APP_TABLES.MIGVANBRANCH} WHERE BranchId = ${escape(BranchId + "")}`);
        
        if (!results)
            throw new Error("Migvan branch not found or is empty.");
        return results;
    };
}
