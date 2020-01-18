import { Injectable, Inject } from '@nestjs/common';
import { Destruction,BranchType,SibaRes,Siba } from 'src/shared/types/system.types';
import { PoolConnection } from 'promise-mysql';
import { APP_TABLES } from 'src/shared/mysql/db.defaults';
import { MysqlService } from 'src/shared/mysql/mysql.service';


@Injectable()

export class DataDestructionWService {
    @Inject(MysqlService) private readonly mysql: MysqlService;

    // async getBranchTypes(netw:string): Promise<BranchType[]> {
    //     const conn = await this.mysql.getConnection(netw);
    //     const results: BranchType[] = await conn.query(`SELECT * FROM ${APP_TABLES.BRANCHTYPE}`);
        
    //     if (!results || !results[0])
    //         throw new Error("Branch types not found or empty.");
    //     return results;
    // }


    async getDestructions(netw:string): Promise<Destruction[]> {
        const conn = await this.mysql.getConnection(netw);
        const results: Destruction[] = await conn.query(`SELECT * FROM ${APP_TABLES.DESTRUCTION}`);
        
        if (!results || !results[0])
            throw new Error("Branch types not found or empty.");
        return results;
    }


    // async getSibaRes(netw: string): Promise<SibaRes[]> {
    //     const conn = await this.mysql.getConnection(netw);
    //     const results: SibaRes[] = await conn.query(`SELECT * FROM ${APP_TABLES.SIBARES}`);

    //     if (!results || !results[0])
    //         throw new Error("SibaRes items not found or empty.");
    //     return results;

    // }

    // async getSibas(netw: string): Promise<Siba[]> {
    //     const conn = await this.mysql.getConnection(netw);
    //     const results: Siba[] = await conn.query(`SELECT * FROM ${APP_TABLES.SIBA}`);

    //     if (!results || !results[0])
    //         throw new Error("Siba items not found or empty.");
    //     return results;

    // }



}


