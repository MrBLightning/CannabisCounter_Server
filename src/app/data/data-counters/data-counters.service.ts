import { Injectable, Inject } from '@nestjs/common';
import { PoolConnection } from 'promise-mysql';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { MysqlService } from 'src/shared/mysql/mysql.service';

@Injectable()
export class DataCountersService {
    @Inject(MysqlService) private readonly mysql: MysqlService;

    async getNextInternalOrderNumber(netw: string): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        const results: any = await conn.query(`SELECT internal_order FROM ${APP_TABLES.COUNTERS}`);

        let orderNumber = results[0].internal_order;
        orderNumber++;

        await conn.query(`UPDATE ${APP_TABLES.COUNTERS} SET internal_order = ${orderNumber}`);

        if (!results[0].internal_order)
            throw new Error("Counters - internal_order - not found or empty.");
        return results[0].internal_order;
    }
    
    async getNextOrderNumber(netw: string): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        const results: any = await conn.query(`SELECT orders FROM ${APP_TABLES.COUNTERS}`);

        let orderNumber = results[0].orders;
        orderNumber++;

        await conn.query(`UPDATE ${APP_TABLES.COUNTERS} SET orders = ${orderNumber}`);

        if (!results[0].orders)
            throw new Error("Counters - orders - not found or empty.");
        return results[0].orders;
    }

    async getNextTransferNumber(netw: string): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        const results: any = await conn.query(`SELECT transfer FROM ${APP_TABLES.COUNTERS}`);

        let transferNumber = results[0].transfer;
        transferNumber++;

        await conn.query(`UPDATE ${APP_TABLES.COUNTERS} SET transfer = ${transferNumber}`);

        if (!results[0].transfer)
            throw new Error("Counters - transfer - not found or empty.");
        return results[0].transfer;
    }

    async getNextInventoryNumber(netw: string): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        const results: any = await conn.query(`SELECT inventory FROM ${APP_TABLES.COUNTERS}`);

        let inventoryNumber = results[0].inventory;
        inventoryNumber++;

        await conn.query(`UPDATE ${APP_TABLES.COUNTERS} SET inventory = ${inventoryNumber}`);

        if (!results[0].inventory)
            throw new Error("Counters - inventory - not found or empty.");
        return results[0].inventory;
    }

    async getNextConversionNumber(netw: string): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        const results: any = await conn.query(`SELECT conversion FROM ${APP_TABLES.COUNTERS}`);

        let conversionNumber = results[0].conversion;
        conversionNumber++;

        await conn.query(`UPDATE ${APP_TABLES.COUNTERS} SET conversion = ${conversionNumber}`);

        if (!results[0].conversion)
            throw new Error("Counters - conversion - not found or empty.");
        return results[0].conversion;
    }

    async getNextDestructionNumber(netw: string): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        const results: any = await conn.query(`SELECT destruction FROM ${APP_TABLES.COUNTERS}`);

        let destructionNumber = results[0].destruction;
        destructionNumber++;

        await conn.query(`UPDATE ${APP_TABLES.COUNTERS} SET destruction = ${destructionNumber}`);

        if (!results[0].destruction)
            throw new Error("Counters - destruction - not found or empty.");
        return results[0].destruction;
    }

    async getNextDeconstructNumber(netw: string): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        const results: any = await conn.query(`SELECT deconstruct FROM ${APP_TABLES.COUNTERS}`);

        let deconstructNumber = results[0].deconstruct;
        deconstructNumber++;

        await conn.query(`UPDATE ${APP_TABLES.COUNTERS} SET deconstruct = ${deconstructNumber}`);

        if (!results[0].deconstruct)
            throw new Error("Counters - deconstruct - not found or empty.");
        return results[0].deconstruct;
    }
}
