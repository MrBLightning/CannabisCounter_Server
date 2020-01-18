import { Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
@Injectable()
export class AppLogger {
    log(opts:
        {
            action: string,
            userId: number,
            branchId: number,
            record: string

        }) {
        let record = {
            action: opts.action,
            userId: opts.userId,
            branchId: opts.branchId,
            record: opts.record
        }
        //let inserId = await appService.addLogRecord(record);
        //if (!inserId) return next(new Error("Unable to post into system_logs."));

        console.log('AppLogger', record);
    };
}
