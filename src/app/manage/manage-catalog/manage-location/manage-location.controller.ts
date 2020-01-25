import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/shared/user/user.service';
import { ManageLocationService } from './manage-location.service';
import { Location } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/locations';

@Controller(ACTION)
@UseGuards(AuthGuard('jwt'))
@Rbac({
    action: ACTION,
    permissions: [
      BASE_ROLE.MANAGER,
      {
        role: BASE_ROLE.USER,
        tasks: ["read","create","edit","delete"]
      }
    ]
  })

export class ManageLocationController {
    @Inject(ManageLocationService) private readonly manageLocationService: ManageLocationService;

    @Get()
    @Rbac({
        action: ACTION,
        tasks: ["read"],
      })
    async getLocations(@ReqUser() user: AuthUser) {
        return await this.manageLocationService.getLocations(user.netw);
    }

    @Get("/:id")
    @Rbac({
        action: ACTION,
        tasks: ["read"],
      })
    async getLocationById(@ReqUser() user: AuthUser, @Param('id') id: number) {
        return await this.manageLocationService.getLocationById(user.netw, id);
    }

    @Post()
    @Rbac({
        action: ACTION,
        tasks: ["create"],
      })
    async addLocation(@ReqUser() user: AuthUser, @Body('record') record: Location) {
        return await this.manageLocationService.addLocation(user.netw, record);
    }

    @Put("/:id")
    @Rbac({
        action: ACTION,
        tasks: ["edit"],
      })
    async updateLocation(@ReqUser() user: AuthUser, @Body('record') record: Location, @Param('id') id: number) {
        return await this.manageLocationService.updateLocation(user.netw, record, id);
    }

    @Delete("/:id")
    @Rbac({
        action: ACTION,
        tasks: ["delete"],
      })
    async deleteLocation(@ReqUser() user: AuthUser, @Param('id') id: number) {
        return await this.manageLocationService.deleteLocation(user.netw, id);
    }
}
