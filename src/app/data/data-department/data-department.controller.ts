import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common';
import { DataDepartmentService } from './data-department.service';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthUser } from 'src/shared/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('data/department')
@UseGuards(AuthGuard('jwt'))
export class DataDepartmentController {
    @Inject(DataDepartmentService) private readonly dataDepartmentService: DataDepartmentService;

    @Get()
    async getDepartments(@ReqUser() user:AuthUser,) {
        return await this.dataDepartmentService.getDepartments(user.netw);
    }
    @Get("/:id")
    async getDepartmentById(@ReqUser() user:AuthUser, @Param('id') id: number) {
        return await this.dataDepartmentService.getDepartmentById(user.netw, id);
    }
}