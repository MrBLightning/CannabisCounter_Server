
import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataSubSuppliersService } from './data-subsuppliers.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';


@Controller('data/subsuppliers')
@UseGuards(AuthGuard('jwt'))
export class DataSubSuppliersController {
    @Inject(DataSubSuppliersService) private readonly dataSubSuppliersService: DataSubSuppliersService;

    @Get()
    async getSubSuppliers(@ReqUser() user: AuthUser, ) {
         return await this.dataSubSuppliersService.getSubSuppliers(user.netw);
    }
}


 