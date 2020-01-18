import { Scope, UnauthorizedException, Provider } from "@nestjs/common";
import { MysqlService } from "./mysql.service";
import { REQUEST } from "@nestjs/core";
import { FactoryProvider } from "@nestjs/common/interfaces";
import { Pool } from "promise-mysql";
import { ConfigService } from "../config/config.service";
import { User } from "../user/user.types";

// This component was supposed to handle mysql connection on the server level
// it dosn't work live so we decided to get rid of it - there is no user in the request
// before the jwt.strategy is run

export const MYSQL_CONNECTION = "MYSQL_CONNECTION";
export const MYSQL_BASE_CONNECTION = "MYSQL_BASE_CONNECTION";

export const MysqlConnection: FactoryProvider<Pool> = {
    scope: Scope.REQUEST,
    provide: MYSQL_CONNECTION,
    inject: [REQUEST, MysqlService],
    useFactory: (request: any, mysql: MysqlService) => {
        if (!request || !request.user || !request.user.netw)
            throw new UnauthorizedException("User requires a network.");
        return mysql.getConnection(request.user.netw);
    }
};
export const MysqlBaseConnection: FactoryProvider<Pool> = {
    scope: Scope.REQUEST,
    provide: MYSQL_BASE_CONNECTION,
    inject: [ConfigService, MysqlService],
    useFactory: (configService: ConfigService, mysql: MysqlService) => {
        return mysql.getConnection(configService.baseDatabase);
    }
};