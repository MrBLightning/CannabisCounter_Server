import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUser } from './auth.types';
import { AppJwtService } from './jwt.service';

export type LoginResponse = {
    user: AuthUser,
    access_token: string,
    exp_date: number
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    @Inject(AuthService) private readonly authService: AuthService;

    async validate(username: string, password: string): Promise<AuthUser> {
        // console.log('local.strategy username/password going into validatePayload', username, password);
        const user = await this.authService.validateCredential(username, password);
        if (!user)
            throw new UnauthorizedException();
        // console.log('local.strategy validation user', user);
        return user;
    }
}