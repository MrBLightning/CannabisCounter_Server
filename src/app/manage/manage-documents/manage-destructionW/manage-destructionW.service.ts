import { Injectable, Inject } from '@nestjs/common';
import { Destruction } from 'src/shared/types/system.types';
import { MysqlService } from 'src/shared/mysql/mysql.service';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { PoolConnection } from 'promise-mysql';

@Injectable()
export class ManageDestructionWService {
    @Inject(MysqlService) private readonly mysql: MysqlService;


    async updateDestruction(netw: string, record: Destruction, Id: number): Promise<number> {
        const conn = await this.mysql.getConnection(netw);

        // this query returns the id of the line updated
        const results: number = await conn.query(`UPDATE ${APP_TABLES.DESTRUCTION} SET ?  WHERE DestructionNumber = ?`, [record, Id]);
        if (!results)
            throw new Error("Destrucrtion not updated.");
        return results;
    };

 

}

