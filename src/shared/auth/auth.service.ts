import { Injectable, Inject, UnauthorizedException, OnApplicationBootstrap } from '@nestjs/common';
import { UserService, handleSnifArray } from '../user/user.service';
import { User } from '../user/user.types';
import { AuthUser, AuthPayload } from './auth.types';
import { CryptService } from './crypt.service';
import { AppJwtService } from './jwt.service';
import { MysqlStoreProvider } from './session/mysql-store.provider';
import Bluebird = require('bluebird');

type LoginResponseDto = {
    user: AuthUser,
    access_token: string,
    exp_date: number
}

@Injectable()
export class AuthService {
    @Inject(UserService) private readonly userService: UserService;
    @Inject(AppJwtService) private readonly jwtService: AppJwtService;
    @Inject(CryptService) private readonly cryptService: CryptService;
    getSession: (sessionId: string) => Bluebird<any>;
    constructor(@Inject(MysqlStoreProvider) store: MysqlStoreProvider) {
        this.getSession = Bluebird.promisify<any, string>((sessionId, cb) => store.get(sessionId, cb));
    }

    async validatePayload(payload: AuthPayload): Promise<AuthUser> {
        console.log('auth.service payload going into validatePayload', payload);
        let session: any;
        try {
            session = await this.getSession(payload.session_id);
        } catch (error) {
            // console.error(error);
        }
        if (!session || !session.passport || !session.passport.user) 
            throw new UnauthorizedException("Invalid Token.");
        
        // const user: User = await this.userService.userById(payload.id, payload.phone);
        return marshalAuthUser(session.passport.user);
    }
    async validateCredential(username: string, password: string): Promise<AuthUser> {
        const user: User = await this.userService.userByCredential(username);
        if (!user.password) throw new UnauthorizedException("Invalid Credentials");
        // if (!this.cryptService.comparePassword(password, user.password))
        //     throw new UnauthorizedException("Invalid Credentials");
        if (password !== user.password)
            throw new UnauthorizedException("Invalid Credentials");
        let result = marshalAuthUser(user);
        console.log('validateCredential result',result);
        //return marshalAuthUser(user);
        return result;
    }
    /**
     *  exp_date is determined by the TOKEN_EXPIRE_IN in auth.module.ts
     *  currently it is set to 1d (1 day) so the amount of time added
     *  to 'now' in order to get the correct expiration time is
     *  24 (hours) * 60 (minutes) * 60 (seconds) * 1000 (miliseconds) - to get the total number of miliseconds in 1 day
     * @param session_id 
     * @param user 
     */
    async login(session_id: string, user: AuthUser): Promise<LoginResponseDto> {
        let exp = Date.now() + 86400000;
        console.log('auth.service returning response: user',user,'exp_date',new Date(exp));
        return {
            user,
            access_token: this.jwtService.createToken({
                session_id,
                id: user.id + "",
                phone: user.phone
            }),
            exp_date: exp
        }
    }
}


export function marshalAuthUser(user: User): AuthUser {
    return {
        id: user.id,
        phone: user.phone,
        role: user.role,
        netw: user.netw,
        name: user.name,
        email: user.email,
        branches: user.branch ? handleSnifArray(user.branch) : []
    }
}