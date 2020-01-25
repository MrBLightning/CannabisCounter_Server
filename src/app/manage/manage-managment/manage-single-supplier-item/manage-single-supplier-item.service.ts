import { Injectable, Inject } from '@nestjs/common';
import { SingleSupplierItem } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';

@Injectable()
export class ManageSingleSupplierItemService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getSingleSupplierItems(netw: string): Promise<SingleSupplierItem[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: SingleSupplierItem[] = await conn.query(`SELECT * FROM ${APP_TABLES.SINGLESUPPLIERITEM}`);

        if (!results || !results[0])
            throw new Error("SingleSupplierItem not found or empty.");
        return results;
    }

    async getSingleSupplierItemById(netw: string, Id: number): Promise<SingleSupplierItem> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: SingleSupplierItem = await conn.query(`SELECT * FROM ${APP_TABLES.SINGLESUPPLIERITEM} WHERE Id = ${escape(Id + "")} LIMIT 1`);

        if (!results)
            throw new Error("SingleSupplierItem not found or empty - getSingleSupplierItemById.");
        return results;
    };

    async getSingleSupplierItemByBarCode(netw: string, BarCode: number): Promise<SingleSupplierItem> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: SingleSupplierItem = await conn.query(`SELECT * FROM ${APP_TABLES.SINGLESUPPLIERITEM} WHERE BarCode = ${escape(BarCode + "")} LIMIT 1`);

        if (!results)
            throw new Error("SingleSupplierItem not found or empty - getSingleSupplierItemByBarCode.");
        return results;
    };

    async addSingleSupplierItem(netw: string, record: SingleSupplierItem): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.SINGLESUPPLIERITEM} SET ?`, [record]);

        if (!results)
            throw new Error("SingleSupplierItem not added.");
        return results;
    };

    async updateSingleSupplierItem(netw: string, record: SingleSupplierItem, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line updated
        const results: number = await conn.query(`UPDATE ${APP_TABLES.SINGLESUPPLIERITEM} SET ?  WHERE Id = ?`, [record, Id]);

        if (!results)
            throw new Error("SingleSupplierItem not updated.");
        return results;
    };

    async deleteSingleSupplierItem(netw: string, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line deleted
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.SINGLESUPPLIERITEM} WHERE Id = ${escape(Id + "")}`);

        if (!results)
            throw new Error("SingleSupplierItem not deleted.");
        return results;
    };

}

