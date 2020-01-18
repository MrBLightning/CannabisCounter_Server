import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class UserCommand {
    constructor(
        private readonly userService: UserService,
    ) { }

    // @Command({
    //     command: 'create:admin <phone> <password>',
    //     describe: 'create a user',
    //     autoExit: true
    // })
    // async createSuperAdmin(
    //     @Positional({
    //         name: 'phone',
    //         describe: 'Phone Number',
    //         type: 'string',
    //     }) phone: string,
    //     @Positional({
    //         name: 'password',
    //         describe: 'Password of user',
    //         type: 'string',
    //     }) password: string,
    // ) {
    //     const user = await this.userService.createSuperAdmin(phone, password);
    //     console.log(user);
    // }
    @Command({
        command: 'test',
        describe: 'Test user command',
        autoExit: true
    })
    async testCommand() {
        console.log("TESTING USER COMMAND SUCCESS!");
    }
}