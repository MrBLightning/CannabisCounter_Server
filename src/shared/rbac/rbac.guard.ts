import { CanActivate, ExecutionContext, Injectable, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RbacMetaToken, RbacDecoratorOptions } from './rbac.decorator';
import { RbacService } from './rbac.service';
import { AuthUser } from '../auth/auth.types';

// const RBAC_GUARD_TOKEN = "RBAC_GUARD";
@Injectable()
export class RbacGuard implements CanActivate {
  @Inject(Reflector) private readonly reflector: Reflector;
  @Inject(RbacService) private readonly rbac: RbacService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let opts = this.reflector.get<RbacDecoratorOptions>(RbacMetaToken, context.getHandler());
    if (!opts)
      opts = this.reflector.get<RbacDecoratorOptions>(RbacMetaToken, context.getClass());
    if (!opts || opts.permissions)
      return true;
    const request = context.switchToHttp().getRequest();
    const user: AuthUser | undefined = request.user;
    if (!user) return false;
    try {
      // console.log("TEST", user, opts.action, opts.tasks);
      
      return await this.rbac.hasAccess(user, opts.action, opts.tasks);
    } catch (error) {
      console.error(error);
    }
    return false;
  }
}