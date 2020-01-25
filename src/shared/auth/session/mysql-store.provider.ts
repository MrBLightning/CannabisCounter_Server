import * as MySQLStore from "express-mysql-session";
import { Store } from "express-session";
import { FactoryProvider, OnApplicationBootstrap } from "@nestjs/common/interfaces";
import { MysqlService } from "src/shared/mysql/mysql.service";
import { ConfigService } from "src/shared/config/config.service";
import { APP_TABLES } from "src/shared/mysql/db.defaults";
import { Injectable, Inject } from "@nestjs/common";
import { PoolConnection } from "promise-mysql";

// export const MysqlSessionStore = "MYSQL_SESSION_STORE";

// export const MysqlStoreProvider: FactoryProvider = {
//     provide: MysqlSessionStore,
//     inject: [MysqlService, ConfigService],
//     useFactory: async (mysql: MysqlService, configService: ConfigService) =>
//         new MySQLStore({
//             schema: {
//                 tableName: APP_TABLES.SESSION,
//                 columnNames: {
//                     data: "data",
//                     expires: "expires",
//                     session_id: "session_id"
//                 }
//             }
//         }, await mysql.getConnection())

// }

@Injectable()
export class MysqlStoreProvider extends MySQLStore {
    // @Inject(MysqlService) private readonly mysql: MysqlService;
    // async onApplicationBootstrap() {
    //     this.connection = await this.mysql.getConnection()
    // }
    constructor(@Inject(ConfigService) configService: ConfigService) {
        // const { MYSQL_HOST, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASS } = configService.config;
        let MYSQL_HOST = '';
        let MYSQL_DATABASE = '';
        let MYSQL_USER = ''; 
        let MYSQL_PASS = '';
        if (process.env.NODE_ENV === 'development'){
            MYSQL_HOST = configService.config.MYSQL_HOST;
            MYSQL_DATABASE = configService.config.MYSQL_DATABASE;
            MYSQL_USER = configService.config.MYSQL_USER;
            MYSQL_PASS = configService.config.MYSQL_PASS;
        } else {
            MYSQL_HOST = process.env.MYSQL_HOST;
            MYSQL_DATABASE = process.env.MYSQL_DATABASE;
            MYSQL_USER = process.env.MYSQL_USER;
            MYSQL_PASS = process.env.MYSQL_PASS;
        }

        super({
            host: MYSQL_HOST,
            port: 3306,
            user: MYSQL_USER,
            password: MYSQL_PASS,
            database: MYSQL_DATABASE,
            schema: {
                tableName: APP_TABLES.SESSION,
                columnNames: {
                    data: "data",
                    expires: "expires",
                    session_id: "session_id"
                },
            }
        })
    }

}