import { Controller, Inject, Get, Param, Body, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { ManagePerukService } from './manage-peruk.service';
import { Peruk, SpecificPeruk } from 'src/shared/types/system.types';
import { AuthUser } from 'src/shared/auth/auth.types';
import { ReqUser } from 'src/shared/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AppLogger } from 'src/shared/logger/app-logger.service';
import { Rbac } from 'src/shared/rbac/rbac.decorator';
import { BASE_ROLE } from 'src/shared/rbac/rbac.types';

const ACTION = 'manage/peruk';

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
export class ManagePerukController {
    @Inject(ManagePerukService) private readonly managePerukService: ManagePerukService;
    // @Inject(AppLogger) private readonly appLogger: AppLogger;

    getChildren = async (netw:string, record: Peruk) => {
        let retriveRecord: SpecificPeruk = {
            BarCodeParent: record.BarCodeParent,
            Level: 'child'
        };
        try {
            return await this.managePerukService.getSpecificPeruk(netw, retriveRecord);
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    getChildPercent = async (netw:string, record: Peruk) => {
        let peruks = await this.getChildren(netw, record);
        let ChildPercent = 0;
        let length = peruks.length;
        for (let i = 0; i < length; i++) {
            if (peruks[i].BarCodeChild != 9999) {
                if (peruks[i].BarCodeChild != record.BarCodeChild) {
                    ChildPercent = ChildPercent + peruks[i].Percent;
                } else {
                    ChildPercent = ChildPercent + record.Percent;
                }
            }
            // if last record return result
            if (i === length) return ChildPercent;
        }
        return ChildPercent;
    }

    // read all lines in table peruk
    @Get()
    @Rbac({
        action: ACTION,
        tasks: ["read"],
    })
    async getPeruks(@ReqUser() user: AuthUser) {
        return await this.managePerukService.getPeruks(user.netw);
    }

    // read all lines in table peruk that are marked as level: req.params.level
    @Get("/:Level")
    @Rbac({
        action: ACTION,
        tasks: ["read"],
    })
    async getPerukByLevel(@ReqUser() user: AuthUser, @Param('Level') Level: string) {
        return await this.managePerukService.getPerukByLevel(user.netw, Level);
    }

    // read line in table peruk by id
    @Get("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["read"],
    })
    async getPerukById(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
        return await this.managePerukService.getPerukById(user.netw, Id);
    }

    // Create a new line in table peruk
    @Post()
    @Rbac({
        action: ACTION,
        tasks: ["create"],
    })
    async addPeruk(@ReqUser() user: AuthUser, @Body('record') record: Peruk) {
        // we need to check what level is the line being created
        // if a new Parent line is being created we need to add a new child line with serialNumber: 9999
        if (record.Level === "parent") {
            // create parent
            await this.managePerukService.addPeruk(user.netw, record);
            // update record for first child
            record.Level = "child";
            record.BarCodeChild = 9999;
            record.Percent = 100;
            // create first child
            return await this.managePerukService.addPeruk(user.netw, record);
        } else {
            // If it's a child we need to first update the percent of the child 9999
            let peruks = await this.getChildren(user.netw, record);
            let childPercent = await this.getChildPercent(user.netw, record);
            childPercent += record.Percent;
            // if (100 - childPercent < 1) {
            //     res.status(400).send({
            //         status: "error",
            //         message: "האחוז הכולל של פריטי עץ המוצר לא יכול לעבור 100",
            //     });
            // } else {
            if (100 - childPercent >= 1) {
                try {
                    // we need to update the 9999 child's new percent 
                    let id = peruks.filter(peruk => peruk.BarCodeChild === 9999)[0].Id;
                    let pchatRecord: Peruk = {
                        Id: id,
                        BarCodeParent: record.BarCodeParent,
                        BarCodeChild: 9999,
                        Remark: record.Remark,
                        Level: "child",
                        Percent: 100 - childPercent
                    };
                    console.log('pchatRecord', pchatRecord);
                    await this.managePerukService.updatePeruk(user.netw, pchatRecord, id);
                    // and finally we add the the original record
                    console.log('new record', record);
                    return await this.managePerukService.addPeruk(user.netw, record);
                } catch (error) {
                    console.error(error);
                    // res.status(400).send({
                    //     status: "error",
                    //     message: "Unable to post into peruk",
                    // });
                }
            }
        }
    }

    // update line in table peruk
    @Put("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["edit"],
    })
    async updatePeruk(@ReqUser() user: AuthUser, @Body('record') record: Peruk, @Param('Id') Id: number) {
        if (record.Level === "child") {
            let retriveRecord: SpecificPeruk  = {
                BarCodeParent: record.BarCodeParent,
                Level: 'child'
            };
            const peruks = await this.managePerukService.getSpecificPeruk(user.netw, retriveRecord);
            let childPercent = 0;
            let length = peruks.length;
            for (let i = 0; i < length; i++) {
                if (peruks[i].BarCodeChild != 9999) {
                    if (peruks[i].BarCodeChild != record.BarCodeChild) {
                        childPercent += peruks[i].Percent;
                    } else {
                        childPercent += record.Percent;
                    }
                }
            }
            // if (100 - childPercent < 1) {
            //     res.status(400).send({
            //         status: "error",
            //         message: "האחוז הכולל של פריטי עץ המוצר לא יכול לעבור 100",
            //     });
            // } else {
            if (100 - childPercent >= 1) {
                let id = peruks.filter(peruk => peruk.BarCodeChild === 9999)[0].Id;
                // we need to update the 9999 child's new percent 
                let pchatRecord = {
                    Id: id,
                    BarCodeParent: record.BarCodeParent,
                    BarCodeChild: 9999,
                    Remark: record.Remark,
                    Level: "child",
                    Percent: 100 - childPercent

                };
                await this.managePerukService.updatePeruk(user.netw, pchatRecord, id);
                // and finally we update the the original record
                return await this.managePerukService.updatePeruk(user.netw, record, Id);
            }
        } else return await this.managePerukService.updatePeruk(user.netw, record, Id);
    }

    // delete line in table peruk
    @Delete("/:Id")
    @Rbac({
        action: ACTION,
        tasks: ["delete"],
    })
    async deletePeruk(@ReqUser() user: AuthUser, @Param('Id') Id: number) {
        return await this.managePerukService.deletePeruk(user.netw, Id);
    }
}


