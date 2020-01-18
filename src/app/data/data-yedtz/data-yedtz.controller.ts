
import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataYedtzService } from './data-yedtz.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';


@Controller('data/yedtz')
@UseGuards(AuthGuard('jwt'))
export class DataYedtzController {
    @Inject(DataYedtzService) private readonly dataYedtzService: DataYedtzService;

    @Get()
    async getYedtzItems(@ReqUser() user: AuthUser, ) {
         return await this.dataYedtzService.getYedtzItems(user.netw);
    }
}


 