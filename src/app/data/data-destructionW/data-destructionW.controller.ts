
import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataDestructionWService } from './data-destructionW.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';


@Controller('data/destructionW')
@UseGuards(AuthGuard('jwt'))
export class DataDestructionWController {
    @Inject(DataDestructionWService) private readonly dataDestructionWService: DataDestructionWService;

    // @Get()
    // async getBranchTypes(@ReqUser() user: AuthUser, ) {
    //     console.log("getBranchTypes")
    //      return await this.dataDestructionWService.getBranchTypes(user.netw);
    // }

    @Get()
    async getDestructions(@ReqUser() user: AuthUser, ) {
        console.log("getDestructions")
         return await this.dataDestructionWService.getDestructions(user.netw);
    }

    // @Get()
    // async getSibaRes(@ReqUser() user: AuthUser, ) {
    //     console.log("getSibaRes")
    //      return await this.dataDestructionWService.getSibaRes(user.netw);
    // }

    // @Get()
    // async getSibas(@ReqUser() user: AuthUser, ) {
    //     console.log("getSibas")
    //      return await this.dataDestructionWService.getSibas(user.netw);
    // }




    // @Get("/:id")
    // async getDestructionItems(@ReqUser() user: AuthUser, @Param('id') UserId: number) {
    //     return await this.dataDestructionWService.getDestructionItems(user.netw, UserId);
    // }
}


 