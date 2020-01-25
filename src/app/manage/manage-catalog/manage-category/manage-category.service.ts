import { Injectable, Inject } from '@nestjs/common';
import { Category } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';
import { PoolConnection } from 'promise-mysql';

@Injectable()
export class ManageCategoryService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getCategorys(netw: string): Promise<Category[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: Category[] = await conn.query(`SELECT * FROM ${APP_TABLES.CATEGORY}`);

        if (!results || !results[0])
            throw new Error("Categorys not found or is empty.");
        return results;

    }

    async getCategoryById(netw: string, id: number): Promise<Category> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: Category = await conn.query(`SELECT * FROM ${APP_TABLES.CATEGORY} WHERE Id = ${escape(id + "")} LIMIT 1`);

        if (!results)
            throw new Error("Categorys not found or is empty.");
        return results;
    };

    async addCategory(netw: string, record: Category): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.CATEGORY} SET ?`, [record]);

        if (!results)
            throw new Error("Category not added.");
        return results;
    };

    async updateCategory(netw: string, record: Category): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line updated
        const results: number = await conn.query(`UPDATE ${APP_TABLES.CATEGORY} SET ?  WHERE Id = ?`, [record, record.Id]);

        if (!results)
            throw new Error("Category not updated.");
        return results;
    };

    async deleteCategory(netw: string, id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line deleted
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.CATEGORY} WHERE Id = ${escape(id + "")}`);

        if (!results)
            throw new Error("Category not deleted.");
        return results;
    };

}
