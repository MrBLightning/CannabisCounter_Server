import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './auth.types';

@Injectable()
export class AppJwtService {
    @Inject(JwtService) private readonly jwt: JwtService;

    createToken(payload: AuthPayload): string {
        return this.jwt.sign(payload)
    }
    verifyToken(token: string): AuthPayload {
        return this.jwt.verify<AuthPayload>(token)
    }
    async verifyTokenAsync(token: string): Promise<AuthPayload> {
        return await this.jwt.verifyAsync<AuthPayload>(token)
    }

}