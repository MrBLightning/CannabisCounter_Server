import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataSupSiryunService } from './data-sup-siryun.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('data/supSiryun')
@UseGuards(AuthGuard('jwt'))
export class DataSupSiryunController {
    @Inject(DataSupSiryunService) private readonly dataSupSiryunService: DataSupSiryunService;

    @Get()
    async getSupSiryuns(@ReqUser() user:AuthUser,) {
        return await this.dataSupSiryunService.getSupSiryuns(user.netw);
    }
    @Get("/:id")
    async getSupSiryunById(@ReqUser() user:AuthUser, @Param('id') id: number) {
        return await this.dataSupSiryunService.getSupSiryunById(user.netw, id);
    }
}