import { Injectable, Inject } from '@nestjs/common';
import { MigvanBranch, Branch, CatalogItem } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';

@Injectable()
export class ManageMigvanBranchService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getMigvanBranches(netw:string): Promise<MigvanBranch[]> {
        const conn = await this.mysql.getConnection(netw);
        let results: MigvanBranch[] = await conn.query(`SELECT * FROM ${APP_TABLES.MIGVANBRANCH}`);
        if (!results || !results[0])
            throw new Error("Migvan branches not found or empty.");
        let length = results.length;
        // let branch: Branch;
        // let catalog: CatalogItem;
        // for (let i = 0; i < length; i++) {
        //     branch = await this.conn.query(`SELECT * FROM ${APP_TABLES.BRANCHES} WHERE BranchId = ${results[i].BranchId} LIMIT 1`);
        //     if (branch) results[i].BranchName = branch.Name;
        //     catalog = await this.conn.query(`SELECT * FROM ${APP_TABLES.CATALOG} WHERE BarCode = ${results[i].BarCode} LIMIT 1`);
        //     if (catalog) results[i].CatalogName = catalog.Name;
        // }
        return results;
    }

    async getMigvanBranchById(netw: string, Id: number): Promise<MigvanBranch> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns a single line object
        const results: MigvanBranch = await conn.query(`SELECT * FROM ${APP_TABLES.MIGVANBRANCH} WHERE Id = ${escape(Id + "")} LIMIT 1`);

        if (!results)
            throw new Error("Migvan branches not found or empty.");

        // let branch: Branch = await this.conn.query(`SELECT * FROM ${APP_TABLES.BRANCHES} WHERE BranchId = ${results.BranchId} LIMIT 1`);
        // if (branch) results.BranchName = branch.Name;
        // let catalog: CatalogItem = await this.conn.query(`SELECT * FROM ${APP_TABLES.CATALOG} WHERE BarCode = ${results.BarCode} LIMIT 1`);
        // if (catalog) results.CatalogName = catalog.Name;
        return results;
    };

    async addMigvanBranch(netw: string, record: MigvanBranch): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the new line created
        const results: number = await conn.query(`INSERT INTO ${APP_TABLES.MIGVANBRANCH} SET ?`, [record]);

        if (!results)
            throw new Error("Migvan branch not added.");
        return results;
    };

    async updateMigvanBranch(netw: string, record: MigvanBranch, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line updated
        const results: number = await conn.query(`UPDATE ${APP_TABLES.MIGVANBRANCH} SET ?  WHERE Id = ?`, [record, Id]);

        if (!results)
            throw new Error("Migvan branch not updated.");
        return results;
    };

    async deleteMigvanBranch(netw: string, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);
        // this query returns the id of the line deleted
        const results: number = await conn.query(`DELETE FROM ${APP_TABLES.MIGVANBRANCH} WHERE Id = ${escape(Id + "")}`);

        if (!results)
            throw new Error("Migvan branch not deleted.");
        return results;
    };

}

