import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataBranchService } from './data-branch.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('data/branch')
@UseGuards(AuthGuard('jwt'))
export class DataBranchController {
    @Inject(DataBranchService) private readonly dataBranchService: DataBranchService;

    @Get()
    async getBranches(@ReqUser() user:AuthUser) {
        return await this.dataBranchService.getBranches(user.netw);
    }
    @Get("/:BranchId")
    async getBranchById(@ReqUser() user:AuthUser, @Param('BranchId') BranchId: number) {
        return await this.dataBranchService.getBranchById(user.netw, BranchId);
    }
}
