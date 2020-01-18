import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export class SessionGuard implements CanActivate {
    public canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        console.log('SessionGuard canActivate request.session.passport',request.session.passport);
        try {
            if (request.session.passport.user) {
                return true;
            }
        } catch (e) {
            throw new UnauthorizedException();
        }

    }
}