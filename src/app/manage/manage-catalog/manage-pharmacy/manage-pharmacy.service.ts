import { LocalStrategy } from '../../../../shared/auth/local.strategy';
import { Injectable, Inject } from '@nestjs/common';
import { Pharmacy, PharmacyAdd } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';

@Injectable()
export class ManagePharmacyService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;


    async getPharmacys(netw: string): Promise<Pharmacy[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: Pharmacy[] = await conn.query(`SELECT * FROM ${APP_TABLES.PHARMACY}`);
        
        if (!results || !results[0])
            throw new Error("Pharmacies not found or empty.");
        return results;

    }

    async getPharmacyById(netw: string, id: number): Promise<Pharmacy> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: Pharmacy = await conn.query(`SELECT * FROM ${APP_TABLES.PHARMACY} WHERE Id = ${escape(id + "")} LIMIT 1`);
        
        if (!results)
            throw new Error("Pharmacies not found or empty.");
        return results;
    };

    async addPharmacy(netw: string, record: PharmacyAdd): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.PHARMACY} SET ?`, [record]);
        
        if (!results)
            throw new Error("Pharmacy not added.");
        return results;
    };

    async updatePharmacy(netw: string, record: Pharmacy, id: number ): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line updated
        const results: number = await conn.query(`UPDATE ${APP_TABLES.PHARMACY} SET ?  WHERE Id = ?`, [record, id]);
        
        if (!results)
            throw new Error("Pharmacy not updated.");
        return results;
    };

    async deletePharmacy(netw: string, id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line deleted
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.PHARMACY} WHERE Id = ${escape(id + "")}`);
        
        if (!results)
            throw new Error("Pharmacy not deleted.");
        return results;
    };

}
