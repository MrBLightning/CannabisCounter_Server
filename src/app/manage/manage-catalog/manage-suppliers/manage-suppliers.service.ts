import { Injectable, Inject } from '@nestjs/common';
import { Supplier } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';
import { PoolConnection } from 'promise-mysql';

@Injectable()
export class ManageSuppliersService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getSuppliers(netw: string): Promise<Supplier[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: Supplier[] = await conn.query(`SELECT * FROM ${APP_TABLES.SUPPLIERS}`);

        if (!results || !results[0])
            throw new Error("Suppliers not found or is empty.");
        return results;

    }

    async getSupplierById(netw: string, id: number): Promise<Supplier> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: Supplier = await conn.query(`SELECT * FROM ${APP_TABLES.SUPPLIERS} WHERE Id = ${escape(id + "")} LIMIT 1`);

        if (!results)
            throw new Error("Suppliers not found or is empty.");
        return results;
    };

    async addSupplier(netw: string, record: Supplier): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.SUPPLIERS} SET ?`, [record]);

        if (!results)
            throw new Error("Suppliers not added.");
        return results;
    };

    async updateSupplier(netw: string, record: Supplier): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line updated
        const results: number = await conn.query(`UPDATE ${APP_TABLES.SUPPLIERS} SET ?  WHERE Id = ?`, [record, record.Id]);

        if (!results)
            throw new Error("Suppliers not updated.");
        return results;
    };

    async deleteSupplier(netw: string, id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line deleted
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.SUPPLIERS} WHERE Id = ${escape(id + "")}`);

        if (!results)
            throw new Error("Suppliers not deleted.");
        return results;
    };

}
