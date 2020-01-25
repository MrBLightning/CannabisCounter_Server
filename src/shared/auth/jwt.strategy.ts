import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { AuthPayload, AuthUser } from './auth.types';
import { AuthService } from './auth.service';
import { User } from '../user/user.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    @Inject(AuthService) private readonly authService: AuthService;
    constructor(@Inject(ConfigService) configService: ConfigService) {
        // console.log('jwt.strategy constructor');
        console.log('jwt.strategy secret',configService.secret);
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.secret,
        });
    }

    async validate(payload: AuthPayload): Promise<AuthUser> {
        // console.log('jwt.strategy payload going into validatePayload', payload);
        const user = await this.authService.validatePayload(payload);
        if (!user)
            throw new UnauthorizedException();
        return user;
    }
}