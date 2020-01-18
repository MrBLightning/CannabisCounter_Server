import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = "zibi";

@Controller()
@UseGuards(AuthGuard('jwt'))
@Rbac({
  action: ACTION,
  permissions: [
    BASE_ROLE.MANAGER,
    {
      role: BASE_ROLE.USER,
      tasks: ["create"]
    }
  ]
})
export class AppController {
  constructor() { }

  @Get()
  apiMain() {
    return {
      status: "ok",
      api_name: "Algo API",
      api_version: "v1.0"
    };
  }


  
  @Get('zibi3')
  @Rbac({
    action: ACTION,
    tasks: ["delete"],
    // roles: [BASE_ROLE.USER, BASE_ROLE.MANAGER],
  })
  zibi3(@Request() req) {
    return req.user;
  }
  @Get('zibi')
  @Rbac({
    action: ACTION,
    tasks: ["create"],
    // roles: [BASE_ROLE.USER, BASE_ROLE.MANAGER],
  })
  zibi(@Request() req) {
    return req.user;
  }
}
