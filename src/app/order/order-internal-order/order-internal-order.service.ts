import { Injectable, Inject } from '@nestjs/common';
import { InternalOrder } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';

@Injectable()
export class OrderInternalOrderService {
    @Inject(MysqlService) private readonly mysql: MysqlService;

    // async getSapakim(netw: string): Promise<Sapak[]> {
    //     const conn = await this.mysql.getConnection(netw);
    //     const results: Sapak[] = await conn.query(`SELECT * FROM ${APP_TABLES.SUPPLIERS}`);

    //     if (!results || !results[0])
    //         throw new Error("Suppliers not found or is empty.");
    //     return results;

    // }

    async getLatestInternalOrders(netw: string,fromOrderNum:number): Promise<InternalOrder[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: InternalOrder[] = await conn.query(`SELECT * FROM ${APP_TABLES.INTERNALORDERS} WHERE OrderNum > ?`,[fromOrderNum]);

        if (!results || !results[0])
            throw new Error("InternalOrders not found or is empty.");
        return results;

    }

    // async getSapakById(netw: string, id: number): Promise<Sapak> {
    //     const conn = await this.mysql.getConnection(netw);
    //     // this query returns a single line object
    //     const results: Sapak = await conn.query(`SELECT * FROM ${APP_TABLES.SUPPLIERS} WHERE Id = ${escape(id + "")} LIMIT 1`);

    //     if (!results)
    //         throw new Error("Suppliers not found or is empty.");
    //     return results;
    // };

    async addInternalOrder(netw: string, record: InternalOrder): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.INTERNALORDERS} SET ?`, [record]);

        if (!results)
            throw new Error("InternalOrders not added.");
        return results;
    };

    // async updateSapak(netw: string, record: Sapak): Promise<number> {
    //     const conn = await this.mysql.getConnection(netw);
    //     // this query returns the id of the line updated
    //     const results: number = await conn.query(`UPDATE ${APP_TABLES.ORDERS} SET ?  WHERE Id = ?`, [record, record.Id]);

    //     if (!results)
    //         throw new Error("Orders not updated.");
    //     return results;
    // };

    async deleteInternalOrder(netw: string, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line deleted
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.INTERNALORDERS} WHERE Id = ${escape(Id + "")}`);

        if (!results)
            throw new Error("InternalOrders not deleted.");
        return results;
    };

}
