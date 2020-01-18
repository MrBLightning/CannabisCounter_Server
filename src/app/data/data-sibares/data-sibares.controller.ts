import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataSibaresService } from './data-sibares.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('data/sibares')
@UseGuards(AuthGuard('jwt'))
export class DataSibaresController {
    @Inject(DataSibaresService) private readonly dataSibaresService: DataSibaresService;

    @Get()
    async getSibaRes(@ReqUser() user: AuthUser, ) {
        return await this.dataSibaresService.getSibaRes(user.netw);
    }
    @Get("/:Id")
    async getSibaResById(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
        return await this.dataSibaresService.getSibaResById(user.netw, Id);
    }
}