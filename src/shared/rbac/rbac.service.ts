import { Injectable, Inject, OnApplicationBootstrap } from '@nestjs/common';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { RbacDecoratorOptions, getPermissionMap } from './rbac.decorator';
import { AuthUser } from '../auth/auth.types';
import { RbacTaskProperty, RoleRecord, PermissionRecord, RbacRole, RbacPermissionTask, RbacTask } from './rbac.types';
import { ConfigService } from 'src/shared/config/config.service';
import { ROLE_SUPER, ROLE_DEFAULT, TASK_LIST } from './rbac.defaults';
import { escape } from 'mysql';


const DEFUALT_NETW = "Admin";

@Injectable()
export class RbacService implements OnApplicationBootstrap {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    private readonly baseDb: string;

    constructor(@Inject(ConfigService) configService: ConfigService) {
        this.baseDb = configService.config.MYSQL_DATABASE;
    }

    async onApplicationBootstrap() {
        const conn = await this.mysql.getConnection();
        const permMap = getPermissionMap();
        const actions = [];
        const roles: string[] = []
        const rolePermMap: {
            [key: string]: RbacPermissionTask
        } = {};

        try {
            await conn.query(CREATE_TABLE_ROLE);
            await conn.query(CREATE_TABLE_ACTION);
            await conn.query(CREATE_TABLE_PERMISSION);
        } catch (error) {
            console.error(error);
            throw "RBAC SERVICE::Unable to generate tables;";
        }

        for (const action in permMap) {
            actions.push(action);
            const _map = permMap[action];
            for (const role in _map) {
                if (!roles.includes(role)) roles.push(role);
                const permission = _map[role];
                const _key = `${action}_${role}`;
                if (!rolePermMap[_key])
                    rolePermMap[_key] = {
                        read: false,
                        edit: false,
                        create: false,
                        delete: false
                    }
                if (!permission)
                    rolePermMap[_key] = {
                        read: true,
                        create: true,
                        delete: true,
                        edit: true,
                    };
                else for (const permit of permission) {
                    rolePermMap[_key][permit] = true;
                }
            }
        }
        for (const role of roles) {
            await conn.query(`INSERT INTO rbac_role(netw, role)
                VALUES('Admin', ${escape(role)})
                ON DUPLICATE KEY UPDATE role = ${escape(role)};`);
            for (const action of actions) {
                const _key = `${action}_${role}`;
                if (!rolePermMap[_key])
                    continue;
                let perm = rolePermMap[_key];
                await conn.query(`INSERT INTO \`rbac_permission\` (\`netw\`,\`action\`, \`role\`, \`read\`, \`create\`, \`edit\`, \`delete\`)
                    VALUES ('Admin', ${escape(action)}, ${escape(role)}, ${TASK_LIST.map(v => escape(perm[v] ? 1 : 0)).join(', ')})
                    ON DUPLICATE KEY UPDATE ${TASK_LIST.map(v => `\`${v}\`=${escape(perm[v] ? 1 : 0)}`).join(', ')};`);
            }
        }
        const actionRecords: { action: string, role: string }[] = await conn.query(`SELECT action, role FROM rbac_permission WHERE netw='${DEFUALT_NETW}';`);
        const deleteActions = actionRecords.filter(item => !rolePermMap[`${item.action}_${item.role}`]);
        if (deleteActions.length > 0)
            await conn.query(`DELETE FROM rbac_permission 
                WHERE netw='${DEFUALT_NETW}' AND (${deleteActions.map(item => `(action=${escape(item.action)} AND role=${escape(item.role)})`).join(' OR ')})`)
        if (actions && actions.length > 0)
            await conn.query(`INSERT IGNORE INTO rbac_action (action) VALUES ${actions.map(a => `(${escape(a)})`).join(', ')};`);
        
    }



    async hasAction(role: string, action: string, netw?: string): Promise<boolean> {
        const conn = await this.mysql.getConnection();
        const perms: PermissionRecord[] = await conn.query(
            `SELECT * FROM rbac_permission 
            WHERE role=${escape(role)} 
                AND action=${escape(action)}
                AND (netw = '${DEFUALT_NETW}' OR netw=${escape(netw || this.baseDb)}) LIMIT 1;`);
        
        return perms[0] != null;
    }
    async hasTask(role: string, action: string, task: RbacTask | RbacTask[], netw?: string): Promise<boolean> {
        const conn = await this.mysql.getConnection();
        let tasks = [];
        if (typeof task === "string")
            tasks.push(task)
        else tasks = task;
        const perms: PermissionRecord[] = await conn.query(
            `SELECT * FROM rbac_permission 
            WHERE role=${escape(role)} 
                AND action=${escape(action)} 
                AND (${tasks.map(task => `\`${task}\`=1`).join(' OR ')})
                AND (netw = '${DEFUALT_NETW}' OR netw=${escape(netw || this.baseDb)}) LIMIT 1;`);
        
        return perms[0] != null;
    }

    async permissionTask(role: string, action: string, netw?: string): Promise<RbacPermissionTask> {
        const conn = await this.mysql.getConnection();
        const perms: PermissionRecord[] = await conn.query(
            `SELECT * FROM rbac_permission 
            WHERE role=? 
            AND action=? 
            AND (netw = '${DEFUALT_NETW}' OR netw=?) LIMIT 1;`, [role, action, netw || this.baseDb])
        const r = perms[0];
        return {
            read: r ? r.read : false,
            edit: r ? r.edit : false,
            delete: r ? r.delete : false,
            create: r ? r.create : false,
        }
    }
    async getRole(role: string, netw?: string): Promise<RbacRole> {
        const conn = await this.mysql.getConnection();
        const roles: RoleRecord[] = await conn.query(`
            SELECT * FROM rbac_role 
            WHERE role=? AND (netw = '${DEFUALT_NETW}' OR netw=?) LIMIT 1;`, [role, netw || this.baseDb])
        if (!roles[0])
            throw "Role not found";
        const roleRecord = roles[0];
        const permissionRecords: (PermissionRecord)[] = await conn.query(`
                SELECT pr.* 
                FROM rbac_permission as pr 
                WHERE pr.role=?`, [roleRecord.role]);
        
        return {
            role: roleRecord.role,
            name: roleRecord.name,
            permission: permissionRecords.map(pr => ({
                action: pr.action,
                read: pr.read,
                edit: pr.edit,
                create: pr.create,
                delete: pr.delete,
            }))
        }
    }

    async hasAccess(user: AuthUser, action: string, tasks?: RbacTask | RbacTask[]): Promise<boolean> {
        const userRole = user.role != null ? user.role : ROLE_DEFAULT;
        if (userRole === ROLE_SUPER)
            return true;
        if (!tasks)
            return await this.hasAction(userRole, action, user.netw);
        return await this.hasTask(userRole, action, tasks, user.netw);
    };
}


const CREATE_TABLE_ROLE = `CREATE TABLE IF NOT EXISTS \`rbac_role\` (
    \`netw\` VARCHAR(45) NOT NULL DEFAULT '${DEFUALT_NETW}',
    \`role\` VARCHAR(45) NOT NULL,
    \`name\` VARCHAR(45) NULL,
    \`created_by\` INT NULL,
    \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    \`updated_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (\`netw\`, \`role\`));`;


const CREATE_TABLE_PERMISSION = `CREATE TABLE IF NOT EXISTS \`rbac_permission\` (
    \`netw\` VARCHAR(45) NOT NULL DEFAULT '${DEFUALT_NETW}',
    \`role\` VARCHAR(45) NOT NULL,
    \`action\` VARCHAR(45) NOT NULL,
    \`read\` TINYINT NULL DEFAULT 0,
    \`create\` TINYINT NULL DEFAULT 0,
    \`edit\` TINYINT NULL DEFAULT 0,
    \`delete\` TINYINT NULL DEFAULT 0,
    \`created_by\` INT NULL,
    \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    \`updated_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (\`netw\`, \`role\`, \`action\`));`;


const CREATE_TABLE_ACTION = `CREATE TABLE IF NOT EXISTS \`rbac_action\` (
    \`action\` VARCHAR(45) NOT NULL,
    \`name\` VARCHAR(45) NULL,
    \`created_at\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    \`updated_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE INDEX \`action_UNIQUE\` (\`action\`),
    PRIMARY KEY (\`action\`));`;