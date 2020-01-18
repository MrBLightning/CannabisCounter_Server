import { Injectable, Inject } from '@nestjs/common';
import { CatalogItem } from 'src/shared/types/system.types';
import { PoolConnection } from 'promise-mysql';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { MysqlService } from 'src/shared/mysql/mysql.service';

@Injectable()
export class DataCatalogService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getCatalogItems(netw:string): Promise<CatalogItem[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: CatalogItem[] = await conn.query(`SELECT * FROM ${APP_TABLES.CATALOG}`);
        
        if (!results || !results[0])
            throw new Error("Catalog items not found or empty.");
        return results;

    }

    async getCatalogItemById(netw:string, BarCode: number): Promise<CatalogItem> {
        const conn = await this.mysql.getConnection(netw);
        const results: CatalogItem = await conn.query(`SELECT * FROM ${APP_TABLES.CATALOG} WHERE BarCode = ${escape(BarCode + "")} LIMIT 1`);
        
        if (!results)
            throw new Error("Catalog item not found or is empty.");
        return results;
    };
}
