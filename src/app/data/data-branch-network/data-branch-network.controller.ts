import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataBranchNetworkService } from './data-branch-network.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('data/branchNetwork')
@UseGuards(AuthGuard('jwt'))
export class DataBranchNetworkController {
    @Inject(DataBranchNetworkService) private readonly  dataBranchNetworkService: DataBranchNetworkService;

    @Get()
    async getBranchNetworks(@ReqUser() user:AuthUser,) {
        return await this.dataBranchNetworkService.getBranchNetworks(user.netw);
    }
}
