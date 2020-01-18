import { Injectable, Inject } from '@nestjs/common';
import { Department } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';

@Injectable()
export class ManageDepartmentService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getDepartments(netw: string): Promise<Department[]> {
        const conn = await this.mysql.getConnection(netw);
        const departments: Department[] = await conn.query(`SELECT * FROM ${APP_TABLES.DEPARTMENTS}`);
        
        if (!departments || !departments[0])
            throw new Error("Departments not found or empty.");
        return departments;
    }

    async getDepartmentById(netw: string, id: number): Promise<Department> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: Department = await conn.query(`SELECT * FROM ${APP_TABLES.DEPARTMENTS} WHERE Id = ${escape(id + "")} LIMIT 1`);
        
        if (!results)
            throw new Error("Department not found or empty.");
        return results;
    };

    async addDepartment(netw: string, record: Department): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.DEPARTMENTS} SET ?`, [record]);
        
        if (!results)
            throw new Error("Department not added.");
        return results;
    };

    async updateDepartment(netw: string, record: Department, id: number ): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line updated
        const results: number = await conn.query(`UPDATE ${APP_TABLES.DEPARTMENTS} SET ?  WHERE Id = ?`, [record, id]);
        
        if (!results)
            throw new Error("Department not updated.");
        return results;
    };

    async deleteDepartment(netw: string, id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line deleted
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.DEPARTMENTS} WHERE Id = ${escape(id + "")}`);
        
        if (!results)
            throw new Error("Department not deleted.");
        return results;
    };

}
