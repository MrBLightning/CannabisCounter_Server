import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataUnitSizeService } from './data-unit-size.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('data/unitsize')
@UseGuards(AuthGuard('jwt'))
export class DataUnitSizeController {
    @Inject(DataUnitSizeService) private readonly dataUnitSizeService: DataUnitSizeService;

    @Get()
    async getUnitSizes(@ReqUser() user:AuthUser,) {
        return await this.dataUnitSizeService.getUnitSizes();
    }
    @Get("/:id")
    async getUnitSizeById(@ReqUser() user:AuthUser, @Param('id') id: number) {
        return await this.dataUnitSizeService.getUnitSizeById(id);
    }
}