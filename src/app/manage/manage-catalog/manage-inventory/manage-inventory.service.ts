import { Injectable, Inject } from '@nestjs/common';
import { Inventory } from 'src/shared/types/system.types';
import { Stock } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';

@Injectable()
export class ManageInventoryService {
    @Inject(MysqlService) private readonly mysql: MysqlService;

    async getStocks(netw: string): Promise<Stock[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: Stock[] = await conn.query(`SELECT * FROM ${APP_TABLES.STOCK}`);
        
        if (!results || !results[0])
            throw new Error("Stocks not found or is empty.");
        return results;

    }

    async getStockById(netw: string, id: number): Promise<Stock> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: Stock = await conn.query(`SELECT * FROM ${APP_TABLES.STOCK} WHERE Id = ${escape(id + "")} LIMIT 1`);
        
        if (!results)
            throw new Error("Stock not found or is empty.");
        return results;
    };

    async addStock(netw: string, record: Stock): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.STOCK} SET ?`, [record]);
        
        if (!results)
            throw new Error("Stock not added.");
        return results;
    };

    async updateStock(netw: string, record: Stock): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line updated
        const results: number = await conn.query(`UPDATE ${APP_TABLES.STOCK} SET ?  WHERE Id = ?`, [record, record.Id]);
        
        if (!results)
            throw new Error("Group not updated.");
        return results;
    };

    async deleteStock(netw: string, id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line deleted
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.STOCK} WHERE Id = ${escape(id + "")}`);
        
        if (!results)
            throw new Error("Stock not deleted.");
        return results;
    };

}
