import { Injectable, Inject } from '@nestjs/common';
import bcrypt from 'bcryptjs';

import { AppConfig } from '../config/config.schema';
import { ConfigService } from '../config/config.service';

@Injectable()
export class CryptService {
    config: AppConfig;
    constructor(@Inject(ConfigService) configService: ConfigService) {
        this.config = configService.config;
    }

    hashPassword(pass: string) {
        if (process.env.NODE_ENV === 'development')
            return bcrypt.hash(pass, this.config.SECRET);
        else return bcrypt.hash(pass, process.env.SECRET);
    };
    comparePassword(pass: string, hash: string) {
        return bcrypt.compare(pass, hash);
    };
}