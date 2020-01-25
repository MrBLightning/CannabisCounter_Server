import { Injectable, Inject } from '@nestjs/common';
import { Subsapak } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';
import { ManageCodeConversionController } from '../manage-code-conversion/manage-code-conversion.controller';

@Injectable()
export class ManageSubSuppliersService {
    @Inject(MysqlService) private readonly mysql: MysqlService;


    async updateSupSupplierItem(netw: string, record: Subsapak, Id: number): Promise<number> {

        const conn = await this.mysql.getConnection(netw);
        const results: number = await conn.query(`UPDATE ${APP_TABLES.SUBSAPAKS} SET ?  WHERE Id = ?`, [record, Id]);

        if (!results)
            throw new Error("SupSupplier not updated.");
        return results;
    };


    async updateSubSupplierParent(netw: string, record: any): Promise<number> {

        console.log("updateSubSupplierParent", record)
        const conn = await this.mysql.getConnection(netw);

        const results: number = await conn.query(`UPDATE ${APP_TABLES.SUBSAPAKS} SET ?  WHERE SubsapakId =?`, [record, record.SubsapakId]);

        if (!results)
            throw new Error("SupSupplier not updated.");
        return results;
    };


    async deleteSupSupplierItem(netw: string, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.SUBSAPAKS} WHERE Id = ${escape(Id + "")}`);

        if (!results)
            throw new Error("SupSupplier not deleted.");
        return results;
    };


    async deleteSupSupplierParent(netw: string, SubsapakId: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);

        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.SUBSAPAKS} WHERE SubsapakId = ${escape(SubsapakId + "")}`);

        if (!results)
            throw new Error("SupSupplier not deleted.");
        return results;
    };


    async addSupSupplierItem(netw: string, record: Subsapak): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.SUBSAPAKS} SET ?`, [record]);

        if (!results)
            throw new Error("SupSupplier not added.");
        return results;
    };



}

