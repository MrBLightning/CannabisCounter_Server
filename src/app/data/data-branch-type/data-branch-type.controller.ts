import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataBranchTypeService } from './data-branch-type.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('data/branchType')
@UseGuards(AuthGuard('jwt'))
export class DataBranchTypeController {
    @Inject(DataBranchTypeService) private readonly dataBranchTypeService: DataBranchTypeService;

    @Get()
    async getBranchTypes(@ReqUser() user:AuthUser,) {
        return await this.dataBranchTypeService.getBranchTypes(user.netw);
    }
}
