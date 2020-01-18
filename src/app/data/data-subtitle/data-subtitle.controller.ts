
import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataSubtitleService } from './data-subtitle.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';


@Controller('data/subtitle')
@UseGuards(AuthGuard('jwt'))
export class DataSubtitleController {
    @Inject(DataSubtitleService) private readonly dataSubtitleService: DataSubtitleService;

    @Get()
    async getYedmItems(@ReqUser() user: AuthUser, ) {
        console.log("getYedmItems")
         return await this.dataSubtitleService.getYedmItems(user.netw);
    }
}


 