import { Injectable, Inject } from '@nestjs/common';
import { PoolConnection } from 'promise-mysql';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';
import * as moment from 'moment';
import { MysqlService } from 'src/shared/mysql/mysql.service';

@Injectable()
export class PlanogramCatalogService {
    @Inject(MysqlService) private readonly mysql: MysqlService;
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;

    async getCatalog(netw) {
        const conn = await this.mysql.getConnection(netw);
        return await conn.query(`
            SELECT Id,BarCode,Name,length,width,height,ClassesId,GroupId,SubGroupId,SapakId,DegemId,Archives
            FROM catalog`);
    }
    async updateBarcodeDimensions(netw, barcode, dimensions) {
        const conn = await this.mysql.getConnection(netw);
        await conn.query(`UPDATE catalog SET height=?, width=?, length=? WHERE BarCode = ?`, [dimensions.height, dimensions.width, dimensions.depth, barcode]);
        const result = await conn.query(`SELECT * FROM catalog WHERE BarCode = ? LIMIT 1`, [barcode]);
        
        return result[0];
    }
    async updateMultipleBarcodeDimensions(netw, products) {
        const promiseCollector = [];
        for (let i = 0; i < products.length; i++) {
            const {
                barcode,
                dimensions
            } = products[i];
            if (barcode == null) continue;

            promiseCollector.push(this.updateBarcodeDimensions(netw, barcode, dimensions));
        }
        const resultProducts = await Promise.all(promiseCollector);
        
        return resultProducts.filter(v => v != null);
    }
    async getBarcodeProduct(netw, barcode) {
        const conn = await this.mysql.getConnection(netw);
        const result = await conn.query(`SELECT * FROM catalog WHERE BarCode = ? LIMIT 1`, [barcode]);
        
        return result;
    }
    async getBarcodeProductByDegem(netw, degemId) {
        const conn = await this.mysql.getConnection(netw);
        const result = await conn.query(`SELECT * FROM catalog WHERE DegemId = ?`, [degemId]);
        
        return result;
    }
    async getBarcodeStatus(netw) {
        const conn = await this.mysql.getConnection(netw);
        const result = await conn.query(`SELECT * FROM planogram_barcode_status`);
        
        return result;
    };
    async updateBarcodeStatus(netw, barcode, message, userId) {
        const conn = await this.mysql.getConnection(netw);
        const result = await conn.query(`INSERT INTO planogram_barcode_status(BarCode,Message,UserId)
            VALUES(?, ?, ?)
            ON DUPLICATE KEY UPDATE BarCode=?, Message=?, UserId=?`, [barcode, message, userId, barcode, message, userId]);
        
        return result;
    };
    async getProductSales(netw, barcode, branchId) {
        const conn = await this.mysql.getConnection(netw);
        const result = await conn.query(`SELECT Id,BarCode,BranchId,(SUM(Avg52) + SUM(Avg8) + SUM(Avg2))/3 AS WeeklyAverage 
                                FROM newAvgLast 
                                WHERE BarCode = ? AND BranchId=? GROUP BY BarCode`, [barcode, branchId]);
        
        return result;
    }

    async getBranchSalesBulk(netw, barcodes = [], branchId) {
        const conn = await this.mysql.getConnection(netw);
        const results = await conn.query(
            `SELECT Id,BarCode,BranchId, (SUM(Avg52) + SUM(Avg8) + SUM(Avg2))/3 AS WeeklyAverage
            FROM newAvgLast 
            WHERE (${barcodes.map(b => `BarCode = ${b}`).join(' OR ')}) AND BranchId = ? GROUP BY BarCode`, [branchId]);
        

        const saleMap = {};
        for (let i = 0; i < results.length; i++) {
            const record = results[i];
            saleMap[record.BarCode] = record;
        }
        return barcodes.map(b => ({
            Id: 0,
            BarCode: b,
            WeeklyAverage: null,
            BranchId: branchId,
            ...saleMap[b]
        }))
    };

    async getCatalogSales(netw, data) {
        const conn = await this.mysql.getConnection(netw);
        if (!data) throw new Error("Empty query");
        const {
            beginDate,
            endDate,
            branch,
            supplier,
            group,
            class: selectedClass
        } = data;
        if (!beginDate || !endDate)
            throw new Error("Missing dates.");

        const beginDateInstance = moment(beginDate).toDate();
        const endDateInstance = moment(endDate).toDate();

        let branches = typeof branch === "string" ? [branch] : branch || [];
        if (branches.length > 0) {
            const results = await conn.query(
                `SELECT BarCode, SUM(Sum) as TotalPrice, SUM(Amount) as TotalAmount, BranchId
                FROM nsales
                WHERE DateBuy>=? AND DateBuy<=? AND (${branches.map(b => `BranchId=${escape(b)}`).join(' OR ')})
                GROUP BY BarCode, BranchId`, [beginDateInstance, endDateInstance]);
            return results;
        }
        const result = await conn.query(`
            SELECT BarCode, SUM(Sum) as TotalPrice, SUM(Amount) as TotalAmount
            FROM nsales_network
            WHERE Date>=? AND Date<=?
            GROUP BY BarCode`, [beginDateInstance, endDateInstance]);
        
        return result;
    }

    async aisleProductReport(netw, storeId) {
        const conn = await this.mysql.getConnection(netw);
        const result = await conn.query(`SELECT a.name, a.pid as aisle_pid, se.pid as section_pid, sh.pid as shelf_pid, sh.pid as shelf_pid, i.barcode, c.Name as barcode_name,
            SUM(i.faces*i.stack*i.row) as TotalAisle, Count(i.pid) as AisleItemCount
            FROM planogram_item as i
                LEFT JOIN planogram_shelf as sh
                ON sh.pid = i.shelf_id
                LEFT JOIN planogram_section as se
                ON se.pid = sh.section_id
                LEFT JOIN planogram_aisle as a
                ON a.pid = se.aisle_id
                LEFT JOIN catalog as c
                ON i.barcode = c.BarCode
            ${storeId ? ` WHERE i.store_id=${escape(storeId)} ` : ""}
            GROUP BY i.barcode, a.pid
            ORDER BY a.pid, se.pid, sh.pid, i.pid;`);
        
        return result;
    }
}
