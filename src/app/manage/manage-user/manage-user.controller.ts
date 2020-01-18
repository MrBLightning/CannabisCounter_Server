import { Controller, Get, Post, Put, Param, BadRequestException, Inject, Body, UseGuards } from '@nestjs/common';
import { UserService } from 'src/shared/user/user.service';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('manage/user')
@UseGuards(AuthGuard('jwt'))
export class ManageUserController {
    @Inject(UserService) private readonly userService: UserService;


    // this is all a sample code for a table controller
    @Get()
    async getUsers() {

    }
    @Get("/:id")
    async getUser(@Param('id') id: string, @Body() body: any) {
        return await this.userService.userById(id);
    }
    @Post()
    async craeteUser() {

    }
    @Put()
    async editUser() {

    }

}