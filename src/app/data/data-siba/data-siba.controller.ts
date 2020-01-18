import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataSibaService } from './data-siba.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('data/siba')
@UseGuards(AuthGuard('jwt'))
export class DataSibaController {
    @Inject(DataSibaService) private readonly dataSibaService: DataSibaService;

    @Get()
    async getSibas(@ReqUser() user: AuthUser, ) {
        return await this.dataSibaService.getSibas(user.netw);
    }
    @Get("/:Id")
    async getSibaById(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
        return await this.dataSibaService.getSibaById(user.netw, Id);
    }
}