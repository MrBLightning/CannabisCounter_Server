
import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataYedService } from './data-yed.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';


@Controller('data/yed')
@UseGuards(AuthGuard('jwt'))
export class DataYedController {
    @Inject(DataYedService) private readonly dataYedService: DataYedService;

    @Get()
    async getYedmItems(@ReqUser() user: AuthUser, ) {
         return await this.dataYedService.getYedItems(user.netw);
    }
}


 