
import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataYedionService } from './data-yedion.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';


@Controller('data/yedion')
@UseGuards(AuthGuard('jwt'))
export class DataYedionController {
    @Inject(DataYedionService) private readonly dataYedionService: DataYedionService;

    @Get()
    async getYedmItems(@ReqUser() user: AuthUser, ) {
         return await this.dataYedionService.getYedion(user.netw);
    }
}


 