import { Injectable, Inject } from '@nestjs/common';
import { Department } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';

@Injectable()
export class DataDepartmentService {
    @Inject(MysqlService) private readonly mysql: MysqlService;

    async getDepartments(netw: string): Promise<Department[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: Department[] = await conn.query(`SELECT * FROM ${APP_TABLES.DEPARTMENTS}`);
        
        if (!results || !results[0])
            throw new Error("Department not found or is empty.");
        return results;

    }

    async getDepartmentById(netw: string, id: number): Promise<Department> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: Department = await conn.query(`SELECT * FROM ${APP_TABLES.DEPARTMENTS} WHERE Id = ${escape(id + "")} LIMIT 1`);
        
        if (!results)
            throw new Error("Department not found or is empty.");
        return results;
    };
}
