import { Injectable, Inject } from '@nestjs/common';
import { User } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';

@Injectable()
export class DataUserService {
    @Inject(MysqlService) private readonly mysql: MysqlService;

    async getUsers(): Promise<User[]> {
        // calling mysql.getConnection empty connects to the default netw - Admin
        const conn = await this.mysql.getConnection();
        const results: User[] = await conn.query(`SELECT * FROM ${APP_TABLES.USERS};`);
        
        if (!results || !results[0])
            throw new Error("Users sizes not found or table is empty");
        return results;
    }

    async getUserById(id: number): Promise<User> {
        // calling mysql.getConnection empty connects to the default netw - Admin
        const conn = await this.mysql.getConnection();
        // this query returns a single line object
        const results: User = await conn.query(`SELECT * FROM ${APP_TABLES.USERS} WHERE id = ${escape(id + "")} LIMIT 1`);
        
        if (!results)
            throw new Error("Users not found or table is empty.");
        return results;
    };
}
