import { Injectable, OnModuleInit, Inject, OnModuleDestroy } from '@nestjs/common';
import { APP_DATABASES } from './db.defaults';
import { Pool, createPool, PoolConnection } from 'promise-mysql';
import { ConfigService } from '../config/config.service';
import { AppConfig } from '../config/config.schema';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class MysqlService implements OnModuleInit, OnModuleDestroy {
    private poolMap: { [db: string]: Pool } = {}
    private readonly config: AppConfig;
    constructor(@Inject(ConfigService) configService: ConfigService) {
        this.config = configService.config;
    }

    async onModuleInit() {
        const baseDb = process.env.NODE_ENV === 'development' ? this.config.MYSQL_DATABASE : process.env.MYSQL_DATABASE;
        this.poolMap[baseDb] = await createPool({
            connectionLimit: 10,
            host: process.env.NODE_ENV === 'development' ? this.config.MYSQL_HOST : process.env.MYSQL_HOST,
            user: process.env.NODE_ENV === 'development' ? this.config.MYSQL_USER : process.env.MYSQL_USER,
            password: process.env.NODE_ENV === 'development' ? this.config.MYSQL_PASS : process.env.MYSQL_PASS,
            database: baseDb,
            dateStrings: true
        });
        for (const db of APP_DATABASES) {
            this.poolMap[db] = await createPool({
                connectionLimit: 10,
                host: process.env.NODE_ENV === 'development' ? this.config.MYSQL_HOST : process.env.MYSQL_HOST,
                user: process.env.NODE_ENV === 'development' ? this.config.MYSQL_USER : process.env.MYSQL_USER,
                password: process.env.NODE_ENV === 'development' ? this.config.MYSQL_PASS : process.env.MYSQL_PASS,
                database: db,
                dateStrings: true
            })
            this.testConnection(db);
            // this.logger.log(SERVICE_TAG + "::Loaded " + db);
        }
    }

    async testConnection(db: string) {
        if (!this.poolMap[db]) throw new Error("Database was not found.");
        const conn = await this.poolMap[db].getConnection();
        
    }

    onModuleDestroy() {
        for (const db in this.poolMap) {
            this.poolMap[db].end();
            delete this.poolMap[db];
        }
    }
    getConnection(db?: string): Pool {
        if (!db) db = this.config.MYSQL_DATABASE;
        if (!this.poolMap[db]) throw new Error("Database was not found.");
        return this.poolMap[db];
    };
    // baseConnection(): Promise<PoolConnection> {
    //     if (!this.poolMap[this.config.MYSQL_DATABASE]) throw new Error("Database was not found.");
    //     return this.poolMap[this.config.MYSQL_DATABASE].getConnection();
    // };
}
