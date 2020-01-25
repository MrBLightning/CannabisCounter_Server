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
        const res = dotenv.config();
        if (res.error)
            throw new Error("Unable to find .env " + res.error.toString());
        let dataConfig = res.parsed;
        // }
        this.config = this.validate(dataConfig);
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
