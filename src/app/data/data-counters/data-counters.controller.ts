import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataCountersService } from './data-counters.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';

function paddNumber(num, padlen, padchar) {
    var pad_char = typeof padchar !== 'undefined' ? padchar : '0';
    var pad = new Array(1 + padlen).join(pad_char);
    return (pad + num).slice(-pad.length);
}

@Controller('data/counters')
@UseGuards(AuthGuard('jwt'))
export class DataCountersController {
    @Inject(DataCountersService) private readonly dataCountersService: DataCountersService;

    @UseGuards(AuthGuard('jwt'))
    @Get('/nextInternalOrderNumber')
    async getNextInternalOrderNumber(@ReqUser() user: AuthUser, ) {
        // Internal Order Number always starts with 10
        let orderNumber = await this.dataCountersService.getNextInternalOrderNumber(user.netw);
        let date = new Date();
        let result = "10" + date.getFullYear().toString().substr(2, 2) + paddNumber(orderNumber, 6, '0');
        return result;
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Get('/nextOrderNumber')
    async getNextOrderNumber(@ReqUser() user: AuthUser, ) {
        // Order Number always starts with 11
        let orderNumber = await this.dataCountersService.getNextOrderNumber(user.netw);
        let date = new Date();
        let result = "11" + date.getFullYear().toString().substr(2, 2) + paddNumber(orderNumber, 6, '0');
        return result;
    }

    
    // Reciving Number always starts with 12


    @UseGuards(AuthGuard('jwt'))
    @Get('/nextTransferNumber')
    async getNextTransferNumber(@ReqUser() user: AuthUser, ) {
        // Transfer Number always starts with 21
        let orderNumber = await this.dataCountersService.getNextTransferNumber(user.netw);
        let date = new Date();
        let result = "21" + date.getFullYear().toString().substr(2, 2) + paddNumber(orderNumber, 6, '0');
        return result;
    }

    // Trash Number always starts with 22

    // Sapak Return Number always starts with 13

    // Transfer Received Number always starts with 28

    @UseGuards(AuthGuard('jwt'))
    @Get('/nextInventoryNumber')
    async getNextInventoryNumber(@ReqUser() user: AuthUser, ) {
        // Inventory Number always starts with 19
        let orderNumber = await this.dataCountersService.getNextInventoryNumber(user.netw);
        let date = new Date();
        let result = "19" + date.getFullYear().toString().substr(2, 2) + paddNumber(orderNumber, 6, '0');
        return result;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/nextDestructionNumber')
    async getNextDestructionNumber(@ReqUser() user: AuthUser, ) {
        // Destruction Number always starts with 29
        let orderNumber = await this.dataCountersService.getNextDestructionNumber(user.netw);
        let date = new Date();
        let result = "29" + date.getFullYear().toString().substr(2, 2) + paddNumber(orderNumber, 6, '0');
        return result;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/nextConversionNumber')
    async getNextConversionNumber(@ReqUser() user: AuthUser, ) {
        // Conversion Number always starts with 31
        let orderNumber = await this.dataCountersService.getNextConversionNumber(user.netw);
        let date = new Date();
        let result = "31" + date.getFullYear().toString().substr(2, 2) + paddNumber(orderNumber, 6, '0');
        return result;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/nextDeconstructNumber')
    async getNextDeconstructNumber(@ReqUser() user: AuthUser, ) {
        // Deconstruct Number always starts with 33
        let orderNumber = await this.dataCountersService.getNextDeconstructNumber(user.netw);
        let date = new Date();
        let result = "33" + date.getFullYear().toString().substr(2, 2) + paddNumber(orderNumber, 6, '0');
        return result;
    }
}