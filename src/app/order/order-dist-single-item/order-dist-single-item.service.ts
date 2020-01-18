import { Injectable, Inject } from '@nestjs/common';
import { ReservedOrder, ReservedOrderData } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';
import moment = require('moment');
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';

@Injectable()
export class OrderDistSingleItemService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getReservedOrders(netw: string): Promise<ReservedOrder[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: ReservedOrder[] = await conn.query(`SELECT * FROM ${APP_TABLES.RESERVEDORDER}`);

        if (!results || !results[0])
            throw new Error("ReservedOrders not found or empty - getReservedOrders.");
        return results;
    }

    async getReservedOrdersByDate(netw: string, DeliveryDate: string): Promise<ReservedOrder[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: ReservedOrder[] = await conn.query(`SELECT * FROM ${APP_TABLES.RESERVEDORDER} WHERE DeliveryDate=?`, [DeliveryDate]);

        if (!results || !results[0])
            throw new Error("ReservedOrders not found or empty - getReservedOrdersByDate.");
        return results;
    }

    async getLastReservedOrder(netw: string): Promise<ReservedOrder> {
        const conn = await this.mysql.getConnection(netw);
        const results: ReservedOrder = await conn.query(`SELECT * FROM ${APP_TABLES.RESERVEDORDER} ORDER BY OrderNum DESC LIMIT 1`);

        if (!results)
            throw new Error("ReservedOrders not found or empty - getLastReservedOrder.");
        return results;
    }

    async addReservedOrder(netw: string, record: ReservedOrderData): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.RESERVEDORDER} SET ?`, [record]);

        if (!results)
            throw new Error("ReservedOrder not added.");
        return results;
    };

    async updateReservedOrder(netw: string, Id: number, record: ReservedOrder): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line updated
        const results: number = await conn.query(`UPDATE ${APP_TABLES.RESERVEDORDER} SET ?  WHERE Id = ?`, [record, record.Id]);

        if (!results)
            throw new Error("ReservedOrder not updated.");
        return results;
    };

    // async deleteSiryun(netw: string, Id: number): Promise<number> {
    //     const conn = await this.mysql.getConnection(netw);
    //     // this query returns the id of the line deleted
    //     const results: number = await conn.query(`DELETE FROM ${APP_TABLES.SIRYUN} WHERE Id = ${escape(Id + "")}`);

    //     if (!results)
    //         throw new Error("Siryun not deleted.");
    //     return results;
    // };

}

