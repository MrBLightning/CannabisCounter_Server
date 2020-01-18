import { Injectable, Inject } from '@nestjs/common';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { ConfigService } from 'src/shared/config/config.service';
import { RbacPermissionTask } from '../../../shared/rbac/rbac.types';

@Injectable()
export class DataRbacService {
    @Inject(MysqlService) private readonly mysql: MysqlService;

    async getPermissions(role:string, netw?: string): Promise<RbacPermissionTask[]> {
        // calling mysql.getConnection empty connects to the default netw - Admin
        const conn = await this.mysql.getConnection();
        const permissions: RbacPermissionTask[] = await conn.query(
            `SELECT * FROM rbac_permission 
            WHERE role=? 
            AND netw=?;`, [role, netw]);
        
        if (!permissions || !permissions[0])
            throw new Error("Permissions not found or empty for this user with role " + role + " and netw " + netw);
        return permissions;
    }
}
