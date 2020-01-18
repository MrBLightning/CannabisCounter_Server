import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/shared/user/user.service';
import { ManageBranchNetworkService } from './manage-branch-network.service';
import { BranchNetwork } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/branchNetwork';

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
export class ManageBranchNetworkController {
    @Inject(ManageBranchNetworkService) private readonly manageBranchNetworkService: ManageBranchNetworkService;

    @Get()
    async getBranchNetworks(@ReqUser() user: AuthUser) {
        return await this.manageBranchNetworkService.getBranchNetworks(user.netw);
    }
    @Get("/:Id")
    async getBranchNetworkById(@ReqUser() user: AuthUser, @Param('Id') id: number) {
        return await this.manageBranchNetworkService.getBranchNetworkById(user.netw, id);
    }
    @Post()
    async addBranchNetwork(@ReqUser() user: AuthUser, @Body('record') record: BranchNetwork) {
        return await this.manageBranchNetworkService.addBranchNetwork(user.netw, record);
    }
    @Put("/:Id")
    async updateBranchNetwork(@ReqUser() user: AuthUser, @Body('record') record: BranchNetwork, @Param('Id') Id: number) {
        return await this.manageBranchNetworkService.updateBranchNetwork(user.netw, record);
    }
    @Delete("/:Id")
    async deleteBranchNetwork(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
        return await this.manageBranchNetworkService.deleteBranchNetwork(user.netw, Id);
    }
}