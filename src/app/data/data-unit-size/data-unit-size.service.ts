import { Injectable, Inject } from '@nestjs/common';
import { UnitSize } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';

@Injectable()
export class DataUnitSizeService {
    @Inject(MysqlService) private readonly mysql: MysqlService;

    async getUnitSizes(): Promise<UnitSize[]> {
        // calling mysql.getConnection empty connects to the default netw - Admin
        const conn = await this.mysql.getConnection();
        const results: UnitSize[] = await conn.query(`SELECT * FROM ${APP_TABLES.UNITSIZE};`);
        
        if (!results || !results[0])
            throw new Error("Unit sizes not found or table is empty");
        return results;
    }

    async getUnitSizeById(id: number): Promise<UnitSize> {
        // calling mysql.getConnection empty connects to the default netw - Admin
        const conn = await this.mysql.getConnection();
        // this query returns a single line object
        const results: UnitSize = await conn.query(`SELECT * FROM ${APP_TABLES.UNITSIZE} WHERE Id = ${escape(id + "")} LIMIT 1`);
        
        if (!results)
            throw new Error("Unit size not found or table is empty.");
        return results;
    };
}
