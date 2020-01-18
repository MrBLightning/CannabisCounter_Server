import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataScrmenuService } from './data-scrmenu.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('data/scrmenu')
@UseGuards(AuthGuard('jwt'))
export class DataScrmenuController {
    @Inject(DataScrmenuService) private readonly dataScrmenuService: DataScrmenuService;

    @Get()
    async getScrmenus(@ReqUser() user:AuthUser,) {
        return await this.dataScrmenuService.getScrmenus(user.netw);
    }
    @Get("/:Id")
    async getScrmenuById(@ReqUser() user:AuthUser, @Param('Id') Id: number) {
        return await this.dataScrmenuService.getScrmenuById(user.netw, Id);
    }
}