import { Injectable, Inject } from '@nestjs/common';
import { PoolConnection } from 'promise-mysql';
import { MysqlService } from 'src/shared/mysql/mysql.service';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';

@Injectable()
export class PlanogramDataService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getBranch(netw, branchId) {
        const conn = await this.mysql.getConnection(netw);
        const branches: any[] = await conn.query(`SELECT * FROM branches WHERE BranchType=0 AND BranchId=${escape(branchId)}`);
        if (!branches[0]) throw new Error("Unable to find branch");
        const branch = branches[0];
        const stores = await conn.query(`SELECT * FROM planogram_store WHERE branch_id=${escape(branchId)}`)
        const newBranch: any = {
            Name: branch.Name,
            BranchId: branch.BranchId,
        }
        if (stores[0])
            newBranch.StoreId = stores[0].id;
        
        return newBranch
    };
    async getBranches(netw) {
        const conn = await this.mysql.getConnection(netw);
        const result = await conn.query(`SELECT * FROM branches WHERE BranchType=0`);
        
        return result;
    };
    async getSuppliers(netw) {
        const conn = await this.mysql.getConnection(netw);
        const result = await conn.query(`SELECT * FROM sapakim`);
        
        return result;
    };
    async getGroups(netw) {
        const conn = await this.mysql.getConnection(netw);
        const result = await conn.query(`SELECT * FROM groups`);
        
        return result;
    };
    async getSubGroups(netw) {
        const conn = await this.mysql.getConnection(netw);
        const result = await conn.query(`
            SELECT sg.*, t.GroupId FROM sub_group as sg
                LEFT JOIN group_to_sub_group as t
                ON t.SubGroupId = sg.Id
                LEFT JOIN groups as g
                ON t.GroupId=g.Id`);
        
        return result;
    };
    async getClasses(netw) {
        const conn = await this.mysql.getConnection(netw);
        const result = await conn.query(`SELECT * FROM classes`);
        
        return result;
    };
    async getSeries(netw) {
        const conn = await this.mysql.getConnection(netw);
        const result = await conn.query(`SELECT * FROM degems`);
        
        return result;
    };


}
