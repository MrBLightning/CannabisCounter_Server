import { Injectable, Inject } from '@nestjs/common';
import { SubSupplier } from 'src/shared/types/system.types';
import { PoolConnection } from 'promise-mysql';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { MysqlService } from 'src/shared/mysql/mysql.service';


@Injectable()

export class DataSubSuppliersService {
    @Inject(MysqlService) private readonly mysql: MysqlService;

    async getSubSuppliers(netw: string): Promise<SubSupplier[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: SubSupplier[] = await conn.query(`SELECT * FROM ${APP_TABLES.SUBSAPAKS}`);

        if (!results || !results[0])
            throw new Error("subsupliers types not found or empty.");
        return results;
    }
}


