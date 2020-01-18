import { Injectable, Inject } from '@nestjs/common';
import { CatalogItem } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';
import { PoolConnection } from 'promise-mysql';

@Injectable()
export class ManageItemService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getItems(netw: string): Promise<CatalogItem[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: CatalogItem[] = await conn.query(`SELECT * FROM ${APP_TABLES.CATALOG}`);

        if (!results || !results[0])
            throw new Error("Catalog not found or is empty.");
        return results;

    }

    async getItemById(netw: string, BarCode: number): Promise<CatalogItem> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: CatalogItem = await conn.query(`SELECT * FROM ${APP_TABLES.CATALOG} WHERE BarCode = ${escape(BarCode + "")} LIMIT 1`);

        if (!results)
            throw new Error("Catalog not found or is empty.");
        return results;
    };

    async addItem(netw: string, record: CatalogItem): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.CATALOG} SET ?`, [record]);

        if (!results)
            throw new Error("Catalog not added.");
        return results;
    };

    async updateItem(netw: string, record: CatalogItem): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line updated
        const results: number = await conn.query(`UPDATE ${APP_TABLES.CATALOG} SET ?  WHERE BarCode = ?`, [record, record.BarCode]);

        if (!results)
            throw new Error("Catalog not updated.");
        return results;
    };

    async deleteItem(netw: string, BarCode: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line deleted
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.CATALOG} WHERE BarCode = ${escape(BarCode + "")}`);

        if (!results)
            throw new Error("Catalog not deleted.");
        return results;
    };

}
