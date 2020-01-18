import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataSubgroupService } from './data-subgroup.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('data/subgroup')
@UseGuards(AuthGuard('jwt'))
export class DataSubgroupController {
    @Inject(DataSubgroupService) private readonly dataSubgroupService: DataSubgroupService;

    @Get()
    async getSubgroups(@ReqUser() user:AuthUser,) {
        return await this.dataSubgroupService.getSubgroups(user.netw);
    }
    @Get("/:id")
    async getSubgroupById(@ReqUser() user:AuthUser, @Param('id') id: number) {
        return await this.dataSubgroupService.getSubgroupById(user.netw, id);
    }
}