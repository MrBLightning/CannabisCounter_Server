import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/shared/user/user.service';
import { ManagePharmacyService } from './manage-pharmacy.service';
import { PharmacyAdd, Pharmacy } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/pharmacy';

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

export class ManagePharmacyController {
    @Inject(ManagePharmacyService) private readonly managePharmacyService: ManagePharmacyService;

    @Get()
    @Rbac({
        action: ACTION,
        tasks: ["read"],
      })
    async getPharmacys(@ReqUser() user: AuthUser) {
        return await this.managePharmacyService.getPharmacys(user.netw);
    }

    @Get("/:id")
    @Rbac({
        action: ACTION,
        tasks: ["read"],
      })
    async getPharmacyById(@ReqUser() user: AuthUser, @Param('id') id: number) {
        return await this.managePharmacyService.getPharmacyById(user.netw, id);
    }

    @Post()
    @Rbac({
        action: ACTION,
        tasks: ["create"],
      })
    async addPharmacy(@ReqUser() user: AuthUser, @Body('record') record: PharmacyAdd) {
        return await this.managePharmacyService.addPharmacy(user.netw, record);
    }

    @Put("/:id")
    @Rbac({
        action: ACTION,
        tasks: ["edit"],
      })
    async updatePharmacy(@ReqUser() user: AuthUser, @Body('record') record: Pharmacy, @Param('id') id: number) {
        return await this.managePharmacyService.updatePharmacy(user.netw, record, id);
    }

    @Delete("/:id")
    @Rbac({
        action: ACTION,
        tasks: ["delete"],
      })
    async deletePharmacy(@ReqUser() user: AuthUser, @Param('id') id: number) {
        return await this.managePharmacyService.deletePharmacy(user.netw, id);
    }
}
