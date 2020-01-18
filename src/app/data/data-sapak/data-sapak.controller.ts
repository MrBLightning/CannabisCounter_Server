import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataSapakService } from './data-sapak.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('data/sapak')
@UseGuards(AuthGuard('jwt'))
export class DataSapakController {
    @Inject(DataSapakService) private readonly dataSapakService: DataSapakService;

    @Get()
    async getSapaks(@ReqUser() user: AuthUser, ) {
        return await this.dataSapakService.getSapaks(user.netw);
    }
    @Get("/:Id")
    async getSapakById(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
        return await this.dataSapakService.getSapakById(user.netw, Id);
    }
}