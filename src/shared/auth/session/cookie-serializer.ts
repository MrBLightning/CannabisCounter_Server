import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthUser, AuthPayload } from '../auth.types';

@Injectable()
export class CookieSerializer extends PassportSerializer {
    serializeUser(user: AuthUser, done: (err: any, id?: any) => void): void {
        done(null, user);
    }

    deserializeUser(payload: AuthPayload, done: (err: any, id?: any) => void): void {
        done(null, payload);
    }
}