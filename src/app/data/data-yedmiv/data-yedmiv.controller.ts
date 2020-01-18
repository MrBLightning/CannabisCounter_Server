
import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataYedmivService } from './data-yedmiv.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';


@Controller('data/yedmiv')
@UseGuards(AuthGuard('jwt'))
export class DataYedmivController {
    @Inject(DataYedmivService) private readonly dataYedmivService: DataYedmivService;

    @Get()
    async getYedmItems(@ReqUser() user: AuthUser, ) {
         return await this.dataYedmivService.getYedmivItems(user.netw);
    }
}


 