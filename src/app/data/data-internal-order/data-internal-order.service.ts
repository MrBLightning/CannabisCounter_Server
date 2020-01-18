import { Injectable, Inject } from '@nestjs/common';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { InternalOrder } from 'src/shared/types/system.types';

@Injectable()
export class DataInternalOrderService {
    @Inject(MysqlService) private readonly mysql: MysqlService;

    async getInternalOrders(netw: string): Promise<InternalOrder[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: InternalOrder[] = await conn.query(`SELECT * FROM ${APP_TABLES.INTERNALORDERS}`);

        if (!results)
            throw new Error("Internal Orders not found or empty.");
        return results;
    }

    async getLastInternalOrder(netw: string): Promise<InternalOrder> {
        const conn = await this.mysql.getConnection(netw);
        const results: InternalOrder = await conn.query(`SELECT * FROM ${APP_TABLES.INTERNALORDERS} ORDER BY OrderNum DESC LIMIT 1`);

        if (!results)
            throw new Error("InternalOrders not found or empty.");
        return results;
    }

    async getInternalOrdersByUSer(netw: string, UserId: number): Promise<InternalOrder[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: InternalOrder[] = await conn.query(`SELECT * FROM ${APP_TABLES.INTERNALORDERS} WHERE CreatedBy = ${UserId + ''}`);

        if (!results)
            throw new Error("InternalOrders not found or empty.");
        return results;
    }

}
