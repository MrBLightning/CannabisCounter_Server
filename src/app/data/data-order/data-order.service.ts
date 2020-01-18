import { Injectable, Inject } from '@nestjs/common';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { Order } from 'src/shared/types/system.types';

@Injectable()
export class DataOrderService {
    @Inject(MysqlService) private readonly mysql: MysqlService;

    async getOrders(netw: string): Promise<Order[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: Order[] = await conn.query(`SELECT * FROM ${APP_TABLES.ORDERS}`);

        if (!results)
            throw new Error("Orders not found or empty.");
        return results;
    }

    async getLastOrder(netw: string): Promise<Order> {
        const conn = await this.mysql.getConnection(netw);
        const results: Order = await conn.query(`SELECT * FROM ${APP_TABLES.ORDERS} ORDER BY OrderNum DESC LIMIT 1`);

        if (!results)
            throw new Error("Orders not found or empty.");
        return results;
    }

    async getOrdersByUSer(netw: string, UserId: number): Promise<Order[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: Order[] = await conn.query(`SELECT * FROM ${APP_TABLES.ORDERS} WHERE CreatedBy = ${UserId + ''}`);

        if (!results)
            throw new Error("Orders not found or empty.");
        return results;
    }

}
