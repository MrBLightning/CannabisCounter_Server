import { Injectable, Inject } from '@nestjs/common';
import * as moment from 'moment';
import { PoolConnection } from 'promise-mysql';
// import { MYSQL_CONNECTION } from 'src/shared/mysql/mysql.provider';
import { AisleDefaultDimension, PLANOGRAM_ID } from './planogram.defaults';
import { StorageService } from 'src/shared/storage/storage.service';
import { MysqlService } from 'src/shared/mysql/mysql.service';

export const elementIdTypes = ['store', 'aisle', 'section', 'shelf'];

@Injectable()
export class PlanogramService {
    // @Inject(MYSQL_CONNECTION) private readonly conn: PoolConnection;
    @Inject(MysqlService) private readonly mysql: MysqlService;
    @Inject(StorageService) private readonly storageService: StorageService;

    async getStores(netw, branchId) {
        const conn = await this.mysql.getConnection(netw);
        let branches = branchId;
        if (!(branches instanceof Array))
            branches = [branches];
        const result = await conn.query(`SELECT * FROM planogram_store WHERE ${branches.map(v => `branch_id=${escape(v)}`).join(' OR ')}`);
        
        return result;
    }
    async getStore(netw, storeId) {
        const conn = await this.mysql.getConnection(netw);
        const promises = [];
        promises.push(conn.query(`SELECT * FROM planogram_store WHERE id=? LIMIT 1`, storeId));
        promises.push(conn.query(`SELECT * FROM planogram_aisle WHERE store_id=?`, storeId));
        promises.push(conn.query(`SELECT * FROM planogram_section WHERE store_id=?`, storeId));
        promises.push(conn.query(`SELECT * FROM planogram_shelf WHERE store_id=?`, storeId));
        promises.push(conn.query(`SELECT * FROM planogram_item WHERE store_id=?`, storeId));
        const [stores, aisles, sections, shelves, items] = await Promise.all(promises);
        
        const store = stores[0];
        if (store == null) throw new Error("Unable to find store");
        const planogramMap = {
            store_id: store.id,
            name: store.name,
            aisle_counter: store.aisle_counter,
            branch_id: store.branch_id,
            aisles: []
        };
        for (const aisle of aisles) {
            planogramMap.aisles.push(buildAisle(aisle, sections, shelves, items));
        }
        return planogramMap;
    }

    async backupPlanogram(netw:string, opts: any = {}) {
        const conn = await this.mysql.getConnection(netw);
        try {
            const {
                data,
                aisleId,
                storeId,
                branchId,
                userId,
                action = "save_store"
            } = opts;

            let zippedData = await this.storageService.zipBlob(JSON.stringify(data));
            await conn.query(
                `INSERT INTO planogram_transaction_backup (store, branch_id, user_id, store_id,action, aisle_id)
                VALUE (?, ?, ?, ?, ?, ?)`,
                [zippedData, branchId, userId, storeId, action, aisleId]
            )
        } catch (error) {
            console.error(error);
        }
    }
    async deleteStoreContent(netw, storeId) {
        const conn = await this.mysql.getConnection(netw);
        const promises = [];
        promises.push(conn.query(`DELETE FROM planogram_aisle WHERE store_id = ?`, [storeId]));
        promises.push(conn.query(`DELETE FROM planogram_section WHERE store_id = ?`, [storeId]));
        promises.push(conn.query(`DELETE FROM planogram_shelf WHERE store_id = ?`, [storeId]));
        promises.push(conn.query(`DELETE FROM planogram_item WHERE store_id = ?`, [storeId]));
        await Promise.all(promises);
    }

    async deleteStore(netw, storeId) {
        const conn = await this.mysql.getConnection(netw);
        await this.deleteStoreContent(netw, storeId);
        await conn.query(`DELETE FROM planogram_store WHERE id=?`, [storeId]);
        
    };
    async renameStore(netw, storeId, newName) {
        const conn = await this.mysql.getConnection(netw);
        const result = await conn.query(`UPDATE planogram_store SET name=? WHERE id=?`, [newName, storeId]);
        
        return result;
    }
    async createNewStore(netw, branchId, userId) {
        const result = await this.saveStore(netw, {
            name: "New Store " + branchId,
            branch_id: branchId,
            aisle_counter: 1,
            aisles: []
        }, userId);
        return result;
    }
    async saveStore(netw, store, userId) {
        const conn = await this.mysql.getConnection(netw);
        let storeId = store.store_id;
        let branchId = store.branch_id;

        if (storeId != null) {
            await conn.query(
                `UPDATE planogram_store SET name=? WHERE id=?`,
                [store.name, storeId]
            );
            await this.deleteStoreContent(netw, storeId);

        } else {
            const result = await conn.query(
                `INSERT INTO planogram_store (branch_id, name, aisle_counter)
            VALUES (?, ?, ?);`,
                [branchId, store.name, store.aisle_counter]
            )
            if (result.insertId == null)
                throw new Error("Planogram store didnt receive id.");
            storeId = result.insertId;
        }


        const newAisles = [];
        for (const aisle of store.aisles) {
            const newAisle = await this.handleAisle(netw, storeId, aisle);
            newAisles.push(newAisle);
        }
        const newStore = {
            ...store,
            store_id: storeId,
            aisles: newAisles
        }

        await this.backupPlanogram(netw, {
            data: store,
            branchId,
            storeId,
            aisleId: null,
            action: "store",
            userId: userId || 0
        });
        
        return newStore
    }

    async getAisle(netw, storeId, aisle_id) {
        const conn = await this.mysql.getConnection(netw);
        const promises = [];
        promises.push(conn.query(`SELECT * FROM planogram_aisle WHERE store_id=? AND id=?`, [storeId, aisle_id]));
        promises.push(conn.query(`SELECT * FROM planogram_section WHERE store_id=?`, [storeId]));
        promises.push(conn.query(`SELECT * FROM planogram_shelf WHERE store_id=?`, storeId));
        promises.push(conn.query(`SELECT * FROM planogram_item WHERE store_id=?`, storeId));
        const [aisles, sections, shelves, items] = await Promise.all(promises);
        
        // console.log("GET AILSE:", aisles.length, sections.length, shelves.length, items.length);
        if (aisles.length === 0)
            throw new Error("Aisle not found.");
        return buildAisle(aisles[0], sections, shelves, items);
    }
    async aisleDetails(netw, aisleId) {
        const conn = await this.mysql.getConnection(netw);
        const aisles = await conn.query(`SELECT * FROM planogram_aisle WHERE id=?`, [aisleId])
        
        return aisles[0];
    }
    async createAisle(netw, storeId) {
        const conn = await this.mysql.getConnection(netw);
        const aisles = await conn.query(`SELECT COUNT(*) as AisleLength FROM planogram_aisle WHERE store_id=? LIMIT 1`, [storeId]);
        const aisleIndex = aisles[0] ? aisles[0].AisleLength : 0;
        const result = await this.handleAisle(netw, storeId, {
            index: aisleIndex,
            name: "New Aisle",
            // aisle_number: aisleNumber,
            dimensions: {
                ...AisleDefaultDimension
            },
            sections: []
        });
        
        return result;
    }
    async saveAisle(netw, storeId, aisle) {
        await this.backupPlanogram(netw, {
            data: aisle,
            storeId,
            aisleId: aisle.aisle_id,
            action: "save_aisle",
        });
        await this.deleteAisleContent(netw, storeId, aisle.aisle_id);
        const result = await this.handleAisle(netw, storeId, aisle);
        
        return result;
    }
    async deleteAisle(netw, storeId, aisleId) {
        const conn = await this.mysql.getConnection(netw);
        const aisle = await this.getAisle(netw, storeId, aisleId);
        await this.backupPlanogram(netw, {
            data: aisle,
            storeId,
            aisleId: aisleId,
            action: "delete_aisle",
        });
        await this.deleteAisleContent(netw, storeId, aisleId);
        await conn.query(`DELETE FROM planogram_aisle WHERE store_id=? AND id=?`, [storeId, aisleId]);
        
    };
    async deleteAisleContent(netw, storeId, aisleId) {
        const conn = await this.mysql.getConnection(netw);
        return await conn.query(
            `DELETE se,sh,i 
            FROM planogram_section as se
                LEFT JOIN planogram_shelf as sh
                ON sh.section_pid = se.pid
                LEFT JOIN planogram_item as i
                ON i.shelf_pid = sh.pid
            WHERE se.store_id=? AND se.aisle_id=?`, [storeId, aisleId]);
    }

    async handleAisle(netw, storeId, aisle) {
        const conn = await this.mysql.getConnection(netw);
        const {
            id: pid,
            aisle_id: id,
            dimensions,
            name,
            aisle_number
        } = aisle;
        const {
            height,
            width,
            depth
        } = dimensions;

        let aisleNumber = aisle_number;
        if (!aisleNumber)
            aisleNumber = await this.getNextAisleNumber(netw, storeId);

        const result = await conn.query(
            `INSERT INTO planogram_aisle (id, store_id, name, pid, height, width, depth, aisle_number)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY
            UPDATE name=?,pid=?,height=?,width=?,depth=?;`, [
            id, storeId, name, pid, height, width, depth, aisleNumber,
            name, pid, height, width, depth
        ])
        if (id == null && result.insertId == null)
            throw new Error("Planogram aisle didnt receive id.");
        const aisleId = result.insertId || id;
        const newSections = []
        for (let i = 0; i < aisle.sections.length; i++) {
            const section = aisle.sections[i];
            const newSection = await this.handleSection(netw, aisle, section, i, storeId);
            newSections.push(newSection);
        }
        return {
            ...aisle,
            aisle_number: aisleNumber,
            aisle_id: aisleId,
            id: PLANOGRAM_ID.AISLE + aisleId,
            sections: newSections,
        }
    }
    async handleSection(netw, aisle, section, index, storeId) {
        const conn = await this.mysql.getConnection(netw);
        const {
            id: pid
        } = section;
        const {
            height,
            width,
            depth
        } = section.dimensions;
        const result = await conn.query(
            `INSERT INTO planogram_section (aisle_id, aisle_pid, pid, store_id,\`index\`, height, width, depth)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [aisle.aisle_id, aisle.id, pid, storeId, index, height, width, depth]
        )
        // if (result.insertId == null)
        //     throw new Error("Planogram aisle didnt receive id.");
        // const sectionId = result.insertId;
        const newShelves = []
        for (let i = 0; i < section.shelves.length; i++) {
            const shelf = section.shelves[i];
            const newShelf = await this.handleShelf(netw, pid, shelf, i, storeId);
            newShelves.push(newShelf);
        }
        return {
            ...section,
            // section_id: sectionId,
            shelves: newShelves
        }
    }
    async handleShelf(netw, sectionPid, shelf, index, storeId) {
        const conn = await this.mysql.getConnection(netw);
        const {
            height,
            width,
            depth
        } = shelf.dimensions;
        const {
            id: pid,
            margin_bottom,
            section_height
        } = shelf;

        const result = await conn.query(
            `INSERT INTO planogram_shelf(section_pid, pid, store_id, \`index\`, height, width, depth, margin_bottom, section_height)
        VALUES(?,?,?,?,?,?,?,?,?)`,
            [sectionPid, pid, storeId, index, height, width, depth, margin_bottom, section_height]
        );

        // if (result.insertId == null)
        //     throw new Error("Planogram aisle didnt receive id.");
        // const shelfId = result.insertId;
        const newItems = [];
        for (let i = 0; i < shelf.items.length; i++) {
            const item = shelf.items[i];
            const newItem = await this.handleShelfItem(netw, pid, item, i, storeId);
            newItems.push(newItem);
        }
        return {
            ...shelf,
            // shelf_id: shelfId,
            items: newItems,
        }
    }
    async handleShelfItem(netw, shelfPid, item, index, storeId) {
        const conn = await this.mysql.getConnection(netw);
        const {
            id: pid,
            product,
            placement
        } = item;
        const {
            faces,
            stack,
            row
        } = placement;
        await conn.query(
            `INSERT INTO planogram_item (barcode, shelf_pid, pid, store_id, \`index\`, faces, stack, row)
            VALUES(?,?,?,?,?,?,?,?);`,
            [product, shelfPid, pid, storeId, index, faces, stack, row])
        return {
            ...item
        }
    }
    async getNextAisleNumber(netw, storeId) {
        const conn = await this.mysql.getConnection(netw);
        await conn.query(`UPDATE planogram_store SET aisle_counter=aisle_counter+1 WHERE id=?`, [storeId]);
        const results = await conn.query(`SELECT aisle_counter FROM planogram_store WHERE id=?`, [storeId]);
        const result = results[0];
        if (!result) throw new Error("Unable to get store number");
        return result.aisle_counter;
    }




    async updateShelfBarcode(netw, storeId, itemId, placement, barcode) {
        const conn = await this.mysql.getConnection(netw);
        if (!placement) placement = {}
        const result = await conn.query(
            `UPDATE planogram_item 
        SET faces=${placement.faces || 1}, stack=${placement.stack || 1}${barcode ? ", barcode=" + escape(barcode) + " " : ""}
        WHERE store_id=${escape(storeId)} AND pid=${escape(itemId)} 
        LIMIT 1`);
        
        return result.affectedRows == 1;
    }
    async addShelfBarcode(netw, opts) {
        const conn = await this.mysql.getConnection(netw);
        const {
            storeId,
            shelfId,
            barcode,
            placement
        } = opts;
        const [shelves, items, catalog] = await Promise.all([
            conn.query(`SELECT * FROM planogram_shelf WHERE store_id=${escape(storeId)} AND pid=${escape(shelfId)}`),
            conn.query(`SELECT * FROM planogram_item WHERE store_id=${escape(storeId)} AND shelf_pid=${escape(shelfId)}`),
            conn.query(`SELECT * FROM catalog WHERE BarCode=${escape(barcode)} LIMIT 1`),
        ]);
        const product = catalog[0];
        const shelf = shelves[0];
        const itemsLength = items.length;

        const faces = placement ? placement.faces : 1;
        const stack = placement ? placement.stack : 1;
        const row = product && product.length && shelf && shelf.depth ? Math.floor(shelf.depth / product.length) || 1 : 1;

        const itemPid = shelfId + PLANOGRAM_ID.ITEM + itemsLength
        await conn.query(
            `INSERT INTO planogram_item (store_id, pid, barcode, shelf_pid, \`index\`, faces, stack, row)
            VALUES (?,?,?,?,?,?,?,?);`,
            [storeId, itemPid, barcode, shelfId, itemsLength, faces, stack, row]
        )
        
        console.log("ADDED ITEM " + barcode + " TO SHELF: " + shelfId);
    }
    async deleteShelfItem(netw, storeId, shlefItemId) {
        const conn = await this.mysql.getConnection(netw);
        const firstItems = await conn.query(`SELECT * FROM planogram_item WHERE store_id=${escape(storeId)} AND pid=${escape(shlefItemId)}`);
        if (!firstItems[0]) throw new Error("Unable to find shelf item.");
        const firstItem = firstItems[0];
        const shelfId = firstItem.shelf_pid;

        let items = await conn.query(`SELECT * FROM planogram_item WHERE store_id=${escape(storeId)} AND shelf_pid=${escape(shelfId)} ORDER BY \`index\` ASC`);
        await conn.query(`DELETE FROM planogram_item WHERE store_id=${escape(storeId)} AND shelf_pid=${escape(shelfId)}`);
        await Promise.all(items.filter(item => item.pid !== shlefItemId)
            .map((item, i) => ({
                index: i,
                id: shelfId + PLANOGRAM_ID.ITEM + i,
                product: item.barcode,
                placement: {
                    faces: item.faces || 1,
                    row: item.row || 1,
                    stack: item.stack || 1,
                }
            }))
            .map(item => this.handleShelfItem(netw, shelfId, item, item.index, storeId))
        );
        
    }




    async aisleToAisleIdFix() {

    }

}




function buildAisle(aisle, sections, shelves, items) {
    const aisleMap = {
        id: PLANOGRAM_ID.AISLE + aisle.id,
        name: aisle.name,
        aisle_id: aisle.id,
        aisle_number: aisle.aisle_number,
        dimensions: {
            height: aisle.height,
            width: aisle.width,
            depth: aisle.depth,
        },
        sections: [],
        created_at: aisle.created_at,
    }
    const sectionCollector = [];

    for (const section of sections) {
        // if (section.aisle_id !== aisle.id && section.aisle_pid !== aisle.pid)
        if (section.aisle_pid !== aisleMap.id)
            continue;

        const sectionMap = {
            id: section.pid,
            index: section.index,
            // section_id: section.id,
            // aisle_id: aisleMap.aisle_id || aisleMap.id,
            dimensions: {
                height: section.height,
                width: section.width,
                depth: section.depth,
            },
            shelves: [],
            created_at: section.created_at,
        };
        const shelfCollector = [];
        for (const shelf of shelves) {
            // if (shelf.section_id !== section.id && shelf.section_pid !== section.pid)
            if (shelf.section_pid !== section.pid)
                continue;
            const shelfMap = {
                id: shelf.pid,
                index: shelf.index,
                // shelf_id: shelf.id,
                // section_id: section.pid,
                dimensions: {
                    height: shelf.height,
                    width: shelf.width,
                    depth: shelf.depth,
                },
                items: [],
                created_at: shelf.created_at,
            }
            const itemCollector = [];
            for (const item of items) {
                // if (item.shelf_id !== shelf.id && item.shelf_pid !== shelf.pid)
                if (item.shelf_pid !== shelf.pid)
                    continue;
                const itemMap = {
                    id: item.pid,
                    // shelf_id: shelf.pid,
                    product: item.barcode,
                    index: item.index,
                    placement: {
                        faces: item.faces,
                        stack: item.stack,
                        row: item.row,
                    }
                }
                itemCollector.push(itemMap);
            }
            shelfMap.items = itemCollector.sort(indexSorter);

            shelfCollector.push(shelfMap);
        }
        sectionMap.shelves = shelfCollector.sort(indexSorter);
        sectionCollector.push(sectionMap);
    }
    aisleMap.sections = sectionCollector.sort(indexSorter);
    return aisleMap;
}

function indexSorter(a, b) {
    if (a.index > b.index)
        return 1;
    return -1;
}