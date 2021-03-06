import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ConfigSchema, AppConfig } from './config.schema';

@Injectable()
export class ConfigService {
    readonly config: AppConfig;

    constructor() {
        // let dataConfig;
        // if (filePath)
        //     dataConfig = dotenv.parse(fs.readFileSync(filePath))
        // else {
        if (process.env.NODE_ENV === 'development') {
            const res = dotenv.config();
            if (res.error)
                throw new Error("Unable to find .env " + res.error.toString());
            let dataConfig = res.parsed;
            // }
            this.config = this.validate(dataConfig);
        } else {
            if (process.env) {
                this.config = {
                    SECRET: process.env.SECRET,
                    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
                    STORAGE_FOLDER: process.env.STORAGE_FOLDER,
                    MYSQL_HOST: process.env.MYSQL_HOST,
                    MYSQL_USER: process.env.MYSQL_USER,
                    MYSQL_PASS: process.env.MYSQL_PASS,
                    APP_NAME: process.env.APP_NAME,
                    APP_VERSION: process.env.APP_VERSION,
                    PORT: parseInt(process.env.PORT),
                    HOST: process.env.HOST,
                }
            } else {
                this.config = {
                    SECRET: '',
                    MYSQL_DATABASE: '',
                    STORAGE_FOLDER: '',
                    MYSQL_HOST: '',
                    MYSQL_USER: '',
                    MYSQL_PASS: '',
                    APP_NAME: '',
                    APP_VERSION: '',
                    PORT: 3000,
                    HOST: '',
                }
            }
        }
    }

    private validate(data: any): AppConfig {
        const res = ConfigSchema.validate(data);
        if (res.error) throw res.error;
        return res.value;
    }


    get secret(): string {
        return this.config.SECRET;
    }
    get baseDatabase(): string {
        return this.config.MYSQL_DATABASE;
    }
    get storage(): string {
        return this.config.STORAGE_FOLDER;
    }
}
