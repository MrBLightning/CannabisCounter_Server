import { Injectable, Inject } from '@nestjs/common';
import { SingleSupplierItem } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';

@Injectable()
export class DataSingleSupplierItemService {
    @Inject(MysqlService) private readonly mysql: MysqlService;

    async getSingleSupplierItems(netw: string): Promise<SingleSupplierItem[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: SingleSupplierItem[] = await conn.query(`SELECT * FROM ${APP_TABLES.SINGLESUPPLIERITEM}`);
        
        if (!results || !results[0])
            throw new Error("SingleSupplierItem not found or is empty.");
        return results;

    }

    async getSingleSupplierItemById(netw: string, Id: number): Promise<SingleSupplierItem> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: SingleSupplierItem = await conn.query(`SELECT * FROM ${APP_TABLES.SINGLESUPPLIERITEM} WHERE Id = ${escape(Id + "")} LIMIT 1`);
        
        if (!results)
            throw new Error("SingleSupplierItem not found or is empty.");
        return results;
    };
}
