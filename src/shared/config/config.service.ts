import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ConfigSchema, AppConfig } from './config.schema';
import { ConfigModule as ConfigureNest } from '@nestjs/config';

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
        } else console.log('not development',process.env);
        // else {
        // ConfigureNest.get<string>('MYSQL_DATABASE');
        // }
    }

    private validate(data: any): AppConfig {
        const res = ConfigSchema.validate(data);
        if (res.error) throw res.error;
        return res.value;
    }


    get secret(): string {
        if (process.env.NODE_ENV === 'development')
            return this.config.SECRET;
        else return process.env.SECRET;
    }
    get baseDatabase(): string {
        if (process.env.NODE_ENV === 'development')
            return this.config.MYSQL_DATABASE;
        else return process.env.MYSQL_DATABASE;
    }
    get storage(): string {
        if (process.env.NODE_ENV === 'development')
            return this.config.STORAGE_FOLDER;
        else return process.env.STORAGE_FOLDER;
    }
}
