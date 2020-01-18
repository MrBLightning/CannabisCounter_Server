import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataDegemService } from './data-degem.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('data/degem')
@UseGuards(AuthGuard('jwt'))
export class DataDegemController {
    @Inject(DataDegemService) private readonly dataDegemService: DataDegemService;

    @Get()
    async getDegems(@ReqUser() user:AuthUser,) {
        return await this.dataDegemService.getDegems(user.netw);
    }
    @Get("/:id")
    async getDegemById(@ReqUser() user:AuthUser, @Param('id') id: number) {
        return await this.dataDegemService.getDegemById(user.netw, id);
    }
}