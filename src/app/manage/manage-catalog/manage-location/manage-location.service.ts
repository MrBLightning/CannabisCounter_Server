import { LocalStrategy } from './../../../../shared/auth/local.strategy';
import { Injectable, Inject } from '@nestjs/common';
import { Location } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';

@Injectable()
export class ManageLocationService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;


    async getLocations(netw: string): Promise<Location[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: Location[] = await conn.query(`SELECT * FROM ${APP_TABLES.LOCATION}`);
        
        if (!results || !results[0])
            throw new Error("Locations not found or empty.");
        return results;

    }

    async getLocationById(netw: string, id: number): Promise<Location> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: Location = await conn.query(`SELECT * FROM ${APP_TABLES.LOCATION} WHERE Id = ${escape(id + "")} LIMIT 1`);
        
        if (!results)
            throw new Error("Locations not found or empty.");
        return results;
    };

    async addLocation(netw: string, record: Location): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.LOCATION} SET ?`, [record]);
        
        if (!results)
            throw new Error("Locations not added.");
        return results;
    };

    async updateLocation(netw: string, record: Location, id: number ): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line updated
        const results: number = await conn.query(`UPDATE ${APP_TABLES.LOCATION} SET ?  WHERE Id = ?`, [record, id]);
        
        if (!results)
            throw new Error("Locations not updated.");
        return results;
    };

    async deleteLocation(netw: string, id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line deleted
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.LOCATION} WHERE Id = ${escape(id + "")}`);
        
        if (!results)
            throw new Error("Locations not deleted.");
        return results;
    };

}
