import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataGroupService } from './data-group.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('data/group')
@UseGuards(AuthGuard('jwt'))
export class DataGroupController {
    @Inject(DataGroupService) private readonly dataGroupService: DataGroupService;

    @Get()
    async getGroups(@ReqUser() user:AuthUser,) {
        return await this.dataGroupService.getGroups(user.netw);
    }
    @Get("/:id")
    async getGroupById(@ReqUser() user:AuthUser, @Param('id') id: number) {
        return await this.dataGroupService.getGroupById(user.netw, id);
    }
}