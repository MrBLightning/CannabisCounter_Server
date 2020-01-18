import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataUserService } from './data-user.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('data/user')
@UseGuards(AuthGuard('jwt'))
export class DataUserController {
    @Inject(DataUserService) private readonly dataUserService: DataUserService;

    @Get()
    async getUsers(@ReqUser() user:AuthUser,) {
        return await this.dataUserService.getUsers();
    }
    @Get("/:id")
    async getUserById(@ReqUser() user:AuthUser, @Param('id') id: number) {
        return await this.dataUserService.getUserById(id);
    }
}