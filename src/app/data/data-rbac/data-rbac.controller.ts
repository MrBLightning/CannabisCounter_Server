import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataRbacService } from './data-rbac.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('data/rbac')
@UseGuards(AuthGuard('jwt'))
export class DataRbacController {
    @Inject(DataRbacService) private readonly dataRbacService: DataRbacService;

    @Get()
    async getPermissions(@ReqUser() user:AuthUser,) {
        return await this.dataRbacService.getPermissions(user.role, user.netw);
    }
}