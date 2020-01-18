import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { OrderReserveFishService } from './order-reserve-fish.service';
import { DataCatalogService } from '../../data/data-catalog/data-catalog.service';
import { DataGroupService } from '../../data/data-group/data-group.service';
import { DataSupSiryunService } from '../../data/data-sup-siryun/data-sup-siryun.service';
import { Siryun, SiryunWhere, SiryunUpdate } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';
import moment = require('moment');

const ACTION = 'order/reserveFish';
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
export class OrderReserveFishController {
  @Inject(OrderReserveFishService) private readonly orderReserveFishService: OrderReserveFishService;
  @Inject(DataCatalogService) private readonly dataCatalogService: DataCatalogService;
  @Inject(DataGroupService) private readonly dataGroupService: DataGroupService;
  @Inject(DataSupSiryunService) private readonly dataSupSiryunService: DataSupSiryunService;
  //   @Inject(AppLogger) private readonly appLogger: AppLogger;

  @Get()
  @Rbac({
    action: ACTION,
    tasks: ["read"],
  })
  async getSiryuns(@ReqUser() user: AuthUser) {
    return await this.orderReserveFishService.getSiryuns(user.netw);
  }

  @Get("/buildTable/:searchDate")
  @Rbac({
    action: ACTION,
    tasks: ["read"],
  })
  async getSiryunTable(@ReqUser() user: AuthUser, @Param('searchDate') searchDate: number) {
    let catalogs = await this.dataCatalogService.getCatalogItems(user.netw);
    // create filter value: ClassId == 6 (Department דגים)
    let ClassId = 6;
    // filter catalogs (items) by ClassId
    catalogs = catalogs.filter(catalog => catalog.ClassesId == ClassId);
    let groups = await this.dataGroupService.getGroups(user.netw);
    // filter groups by ClassId 
    groups = groups.filter(group => group.ClassId == ClassId);
    let allSupSiryuns = await this.dataSupSiryunService.getSupSiryuns(user.netw);
    // filter suplliers by ClassId 
    let supSiryuns = [];
    let length = allSupSiryuns.length;
    // get list of suppliers that are relevent for the ClassId 
    for (let i = 0; i < length; i++) {
      let availGroup = groups.filter(group => group.Id == allSupSiryuns[i].GroupId)[0];
      if (availGroup && typeof availGroup != undefined) {
        supSiryuns.push(allSupSiryuns[i]);
      }
    }
    // create the siryun table to display based on relevent catalog items, 
    // suppliers and siryun records based on the date sent by the client
    let mySiryuns = [];
    for (let y = 0; y < catalogs.length; y++) {
      let line: any = {};
      line = {
        BarCode: catalogs[y].BarCode,
        CreateDate: null,
        TotSiryun: 0,
        TotHaluka: 0
      }
      for (let n = 0; n < supSiryuns.length; n++) {
        let sup2 = "sup_siryun_" + supSiryuns[n].SapakId;
        let sup3 = "sup_haluka_" + supSiryuns[n].SapakId;
        line[sup2] = null;
        line[sup3] = null;
      }
      mySiryuns.push(line);
    }
    let SearchDate = new Date();
    SearchDate.setTime(searchDate);
    let siryuns = await this.orderReserveFishService.getSiryunByDate(user.netw, moment(SearchDate).format('YYYY-MM-DD'));
    let lengthCatalogs = catalogs.length;
    for (let i = 0; i < lengthCatalogs; i++) {
      let siryunBar = siryuns.filter(siryun => siryun.BarCode == catalogs[i].BarCode);
      if (typeof siryunBar[0] === 'undefined') {
        for (let n = 0; n < supSiryuns.length; n++) {
          //console.log("addSiryun",this.state.catalogs[i].BarCode,this.state.supSiryuns[n].SapakId);
          let record = {
            CreateDate: new Date(moment(SearchDate).format('YYYY-MM-DD')),
            BarCode: catalogs[i].BarCode,
            ClassId: catalogs[i].ClassesId,
            GroupId: catalogs[i].GroupId,
            SapakId: supSiryuns[n].SapakId,
            SapakSiryun: null,
            CreatedBy: user.id
          }
          await this.orderReserveFishService.addSiryun(user.netw, record);
        }
      } else {
        let bLength = siryunBar.length;
        for (let y = 0; y < mySiryuns.length; y++) {
          if (mySiryuns[y].BarCode == siryunBar[0].BarCode) {
            for (let b = 0; b < bLength; b++) {
              let sup2 = "sup_siryun_" + siryunBar[b].SapakId;
              mySiryuns[y][sup2] = siryunBar[b].SapakSiryun;
              mySiryuns[y].TotSiryun = mySiryuns[y].TotSiryun + siryunBar[b].SapakSiryun;
              mySiryuns[y].CreateDate = siryunBar[b].CreateDate;
            }
          }
        }
      }
    }
    return mySiryuns;
  }

  @Get("/:CreateDate")
  @Rbac({
    action: ACTION,
    tasks: ["read"],
  })
  async getSiryunByDate(@ReqUser() user: AuthUser, @Param('CreateDate') CreateDate: string) {
    return await this.orderReserveFishService.getSiryunByDate(user.netw, CreateDate);
  }

  @Post()
  @Rbac({
    action: ACTION,
    tasks: ["create"],
  })
  async addSiryun(@ReqUser() user: AuthUser, @Body('record') record: Siryun) {
    // this.appLogger.log({
    //   record: JSON.stringify(record),
    //   action: "addBranch",
    //   userId: user.id,
    //   branchId: user.branches[0]
    // });
    return await this.orderReserveFishService.addSiryun(user.netw, record);
  }

  @Put()
  @Rbac({
    action: ACTION,
    tasks: ["edit"],
  })
  async updateSiryun(@ReqUser() user: AuthUser, @Body('record') record: SiryunUpdate, @Body('recordWhere') recordWhere: SiryunWhere) {
    // this.appLogger.log({
    //   record: JSON.stringify(record),
    //   action: "updateBranch",
    //   userId: user.id,
    //   branchId: user.branches[0]
    // });
    return await this.orderReserveFishService.updateSiryun(user.netw, recordWhere, record);
  }

  @Delete("/:Id")
  @Rbac({
    action: ACTION,
    tasks: ["delete"],
  })
  async deleteSiryun(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
    // let record: Branch = await this.manageBranchesService.getBranchById(user.netw, BranchId);
    // this.appLogger.log({
    //   record: JSON.stringify(record),
    //   action: "deleteBranch",
    //   userId: user.id,
    //   branchId: user.branches[0]
    // });
    return await this.orderReserveFishService.deleteSiryun(user.netw, Id);
  }
}
