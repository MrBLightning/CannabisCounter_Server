import { Controller, Get, BadRequestException, Param, Inject, UseGuards } from '@nestjs/common';
import { PlanogramDataService } from './planogram-data.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';

const BASE_PATH = "/planogram"

@Controller(BASE_PATH + '/data')
@UseGuards(AuthGuard('jwt'))
export class DataController {
    @Inject(PlanogramDataService) readonly dataService: PlanogramDataService;

    @UseGuards(AuthGuard('jwt'))
    @Get('/branches')
    async get_branches(@ReqUser() user: AuthUser, ) {
        const branches = await this.dataService.getBranches(user.netw);
        if (!branches)
            throw new BadRequestException();
        return branches;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/branch/:branch_id')
    async get_branch(@ReqUser() user: AuthUser, @Param("branch_id") branch_id: string) {
        if (!branch_id) throw new BadRequestException("Unable to find branch Id");
        const branchId = Number(branch_id);
        // if (req.user.level > 10 && !req.user.branches.includes(branchId))
        //     return res.statusCode(403).send({
        //         status: "error",
        //         message: "User doesnt have branch"
        //     })
        const branch = await this.dataService.getBranch(user.netw, branchId);
        if (!branch)
            throw new BadRequestException();
        return {
            status: "ok",
            branch
        };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/suppliers')
    async get_suppliers(@ReqUser() user: AuthUser, ) {
        const suppliers = await this.dataService.getSuppliers(user.netw);
        if (!suppliers)
            throw new BadRequestException();
        return suppliers;

    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/groups')
    async get_groups(@ReqUser() user: AuthUser, ) {
        const groups = await this.dataService.getGroups(user.netw);
        if (!groups)
            throw new BadRequestException();
        return groups;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/subgroups')
    async get_subgroups(@ReqUser() user: AuthUser, ) {
        const subgroups = await this.dataService.getSubGroups(user.netw);
        if (!subgroups)
            throw new BadRequestException();
        return subgroups;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/classes')
    async get_classes(@ReqUser() user: AuthUser, ) {
        const classes = await this.dataService.getClasses(user.netw);
        if (!classes)
            throw new BadRequestException();
        return classes;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/series')
    async get_series(@ReqUser() user: AuthUser, ) {
        const series = await this.dataService.getSeries(user.netw);
        if (!series)
            throw new BadRequestException();
        return series;

    }

}
