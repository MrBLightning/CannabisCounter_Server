import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/shared/user/user.service';
import { ManageDepartmentService } from './manage-department.service';
import { Department } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/department';
@Controller('manage/department')
@UseGuards(AuthGuard('jwt'))
@Rbac({
  action: ACTION,
  permissions: [
    BASE_ROLE.MANAGER,
    {
      role: BASE_ROLE.USER,
      tasks: ["read"]
    }
  ]
})
export class ManageDepartmentController {
  @Inject(ManageDepartmentService) private readonly manageDepartmentService: ManageDepartmentService;
  @Inject(AppLogger) private readonly appLogger: AppLogger;

  @Get()
  @Rbac({
    action: ACTION,
    tasks: ["read"],
  })
  async getDepartments(@ReqUser() user: AuthUser) {
    // console.log('getDepartments',user);
    return await this.manageDepartmentService.getDepartments(user.netw);
  }
  @Get("/:id")
  @Rbac({
    action: ACTION,
    tasks: ["read"],
  })
  async getDepartmentById(@ReqUser() user: AuthUser, @Param('id') id: number) {
    return await this.manageDepartmentService.getDepartmentById(user.netw, id);
  }
  @Post()
  @Rbac({
    action: ACTION,
    tasks: ["create"],
  })
  async addDepartment(@ReqUser() user: AuthUser, @Body('record') record: Department) {
    this.appLogger.log({
      record: JSON.stringify(record),
      action: "addDepartment",
      userId: user.id,
      branchId: user.branches[0]
    });
    return await this.manageDepartmentService.addDepartment(user.netw, record);
  }
  @Put("/:id")
  @Rbac({
    action: ACTION,
    tasks: ["edit"],
  })
  async updateDepartment(@ReqUser() user: AuthUser, @Body('record') record: Department, @Param('id') id: number) {
    this.appLogger.log({
      record: JSON.stringify(record),
      action: "updateDepartment",
      userId: user.id,
      branchId: user.branches[0]
    });
    return await this.manageDepartmentService.updateDepartment(user.netw, record, id);
  }
  @Delete("/:id")
  @Rbac({
    action: ACTION,
    tasks: ["delete"],
  })
  async deleteDepartment(@ReqUser() user: AuthUser, @Param('id') id: number) {
    let record: Department = await this.manageDepartmentService.getDepartmentById(user.netw, id);
    this.appLogger.log({
      record: JSON.stringify(record),
      action: "deleteDepartment",
      userId: user.id,
      branchId: user.branches[0]
    });
    return await this.manageDepartmentService.deleteDepartment(user.netw, id);
  }
}