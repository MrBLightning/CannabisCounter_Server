import { Injectable, Inject } from '@nestjs/common';
import { BranchType } from 'src/shared/types/system.types';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';
import { MysqlService } from 'src/shared/mysql/mysql.service';

@Injectable()
export class DataBranchTypeService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getBranchTypes(netw:string): Promise<BranchType[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: BranchType[] = await conn.query(`SELECT * FROM ${APP_TABLES.BRANCHTYPE}`);
        
        if (!results || !results[0])
            throw new Error("Branch types not found or empty.");
        return results;
    }
}
