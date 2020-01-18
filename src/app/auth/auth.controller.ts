import { Controller, Req, Body, Inject, Post, UseGuards, Get, Res } from '@nestjs/common';
import { AuthService } from 'src/shared/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { SessionAuthGuard } from 'src/shared/auth/session/session-auth.guard';
import { SessionGuard } from 'src/shared/auth/session/session.guard';


@Controller('auth')
export class AuthController {
    @Inject(AuthService) private readonly authService: AuthService;
    // @Inject(JwtService) private readonly jwtService: JwtService;

    @Post('login')
    @UseGuards(SessionAuthGuard) // local checks user and password
    login(@Req() req: Request, @ReqUser() user: AuthUser) {
        return this.authService.login(req.session.id, user);
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    getProfile(@ReqUser() user: AuthUser) {
        return user;
    }

}
