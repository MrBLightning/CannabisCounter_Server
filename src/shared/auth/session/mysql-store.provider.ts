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
        const { MYSQL_HOST, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASS } = configService.config;
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