import { Injectable, Inject, OnApplicationBootstrap } from '@nestjs/common';
import { User } from './user.types';
import { MysqlService } from '../mysql/mysql.service';
import { APP_TABLES } from '../mysql/db.defaults';
import { ROLE_SUPER } from '../rbac/rbac.defaults';

@Injectable()
export class UserService implements OnApplicationBootstrap {
    @Inject(MysqlService) protected readonly mysql: MysqlService;
    private readonly table = APP_TABLES.USERS;
    async onApplicationBootstrap() {
        const conn = await this.mysql.getConnection();
        await conn.query(CREATE_TABLE_USERS);
    }

    async userById(id: string | number, phone?: string, ): Promise<User> {
        const conn = await this.mysql.getConnection();
        const users: User[] = await conn.query(`
            SELECT * FROM ${this.table} 
            WHERE id=${escape(id + "")} ${phone ? ` AND phone=${escape(phone)}` : ""} LIMIT 1`);
        
        if (!users || !users[0])
            throw new Error("User not found.");
        return users[0];
    }
    async userByCredential(phone: string): Promise<User> {
        const conn = await this.mysql.getConnection();
        const users: User[] = await conn.query(`SELECT * FROM ${this.table} WHERE phone=? LIMIT 1`, [phone]);
        
        if (!users || !users[0])
            throw new Error("User not found.");
        return users[0];
    }

    async createSuperAdmin(phone: string, password: string) {
        const conn = await this.mysql.getConnection();
        conn.query(`INSERT IF NOT EXISTS INTO ${this.table} (phone, password, role, name) VALUES(?,?,?,?,?)`, [phone, password, ROLE_SUPER])
        
    }

}

export function handleSnifArray(snifString: string): number[] {
    return snifString.split(',').map(v => Number(v));
}

const CREATE_TABLE_USERS = `
    CREATE TABLE IF NOT EXISTS \`${APP_TABLES.USERS}\` ( 
        \`id\` INT NOT NULL AUTO_INCREMENT , 
        \`phone\` VARCHAR(14) NOT NULL , 
        \`password\` VARCHAR(42) NOT NULL , 
        \`role\` VARCHAR(45) NOT NULL DEFAULT 'user' , 
        \`netw\` VARCHAR(45) NOT NULL , 
        \`name\` VARCHAR(128) NOT NULL , 
        \`branch\` VARCHAR(128) NOT NULL , 
        \`email\` VARCHAR(255) NULL , 
        \`created_by\` INT NULL , 
        \`updated_at\` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , 
        \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
        PRIMARY KEY (\`id\`), 
        UNIQUE \`user_phone\` (\`phone\`)
    );`;