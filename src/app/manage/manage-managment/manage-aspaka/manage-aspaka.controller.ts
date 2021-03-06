import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { ManageAspakaService } from './manage-aspaka.service';
import { Branch, AspakaRecord } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/aspaka';
@Controller(ACTION)
@UseGuards(AuthGuard('jwt'))
@Rbac({
    action: ACTION,
    permissions: [
        BASE_ROLE.MANAGER,
        {
            role: BASE_ROLE.USER,
            tasks: ["read", "create", "edit", "delete"]
        }
    ]
})
export class ManageAspakaController {
    @Inject(ManageAspakaService) private readonly manageAspakaService: ManageAspakaService;
    // @Inject(AppLogger) private readonly appLogger: AppLogger;

    @Get()
    @Rbac({
        action: ACTION,
        tasks: ["read"],
    })
    async getAspakaRecords(@ReqUser() user: AuthUser) {
        return await this.manageAspakaService.getAspakaRecords(user.netw);
    }
    @Get("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["read"],
    })
    async getAspakaById(@ReqUser() user: AuthUser, @Param('BranchId') Id: number) {
        return await this.manageAspakaService.getAspakaById(user.netw, Id);
    }
    @Post()
    @Rbac({
        action: ACTION,
        tasks: ["create"],
    })
    async addAspaka(@ReqUser() user: AuthUser, @Body('record') record: AspakaRecord) {
        // this.appLogger.log({
        //     record: JSON.stringify(record),
        //     action: "addBranch",
        //     userId: user.id,
        //     branchId: user.branches[0]
        // });
        return await this.manageAspakaService.addAspaka(user.netw, record);
    }
    @Put("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["edit"],
    })
    async updateAspaka(@ReqUser() user: AuthUser, @Body('record') record: AspakaRecord, @Param('Id') Id: number) {
        // this.appLogger.log({
        //     record: JSON.stringify(record),
        //     action: "updateBranch",
        //     userId: user.id,
        //     branchId: user.branches[0]
        // });
        return await this.manageAspakaService.updateAspaka(user.netw, record, Id);
    }
    @Delete("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["delete"],
    })
    async deleteAspaka(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
        // let record: Branch = await this.manageAspakaService.getAspakaById(user.netw, BranchId);
        // this.appLogger.log({
        //     record: JSON.stringify(record),
        //     action: "deleteBranch",
        //     userId: user.id,
        //     branchId: user.branches[0]
        // });
        return await this.manageAspakaService.deleteAspaka(user.netw, Id);
    }
}
