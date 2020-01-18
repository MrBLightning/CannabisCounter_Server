import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import { AuthUser } from './auth.types';
import { User } from '../user/user.types';

export const UserNetwork = createParamDecorator((data, req) => {
    // console.log('UserNetwork req.user', req.user);
    if (!req.user)
        throw new UnauthorizedException();
    const user: AuthUser = req.user;
    return user.netw;
});
export const ReqUser = createParamDecorator((data: string, req) => {
    // console.log('ReqUser req.user', req.user);
    if (!req.user)
        throw new UnauthorizedException();
    return data ? req.user[data] : req.user;
});