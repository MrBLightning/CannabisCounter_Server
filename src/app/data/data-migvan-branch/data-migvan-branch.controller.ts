import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataMigvanBranchService } from './data-migvan-branch.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('data/migvanBranch')
@UseGuards(AuthGuard('jwt'))
export class DataMigvanBranchController {
    @Inject(DataMigvanBranchService) private readonly dataMigvanBranchService: DataMigvanBranchService;

    @Get()
    async getMigvanBranchs(@ReqUser() user:AuthUser,) {
        return await this.dataMigvanBranchService.getMigvanBranchs(user.netw);
    }
    @Get("/:BranchId")
    async getMigvanBranchById(@ReqUser() user:AuthUser, @Param('BranchId') BranchId: number) {
        return await this.dataMigvanBranchService.getMigvanBranchById(user.netw, BranchId);
    }
}