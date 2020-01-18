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
        return bcrypt.hash(pass, this.config.SECRET);
    };
    comparePassword(pass: string, hash: string) {
        return bcrypt.compare(pass, hash);
    };
}