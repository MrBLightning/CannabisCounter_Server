import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import {
    join,
    parse
} from 'path';
import { mkdirpSync } from "../lib/mkdirp"
import * as zlib from 'zlib';

import {
    writeFile,
    existsSync,
    readdirSync,
    statSync
} from 'fs';
import { ConfigService } from '../config/config.service';

const folders = [
    'uploads',
    'orders'
];

@Injectable()
export class StorageService implements OnModuleInit {
    @Inject(ConfigService) private readonly configService: ConfigService;

    async onModuleInit() {
        const storageFolder = this.configService.storage;
        if (!existsSync(storageFolder)) {
            mkdirpSync(storageFolder);
            console.log("StorageService:: Generated Main Folder: " + storageFolder);
        }
        // throw new Error("StorageService::Storage path (" + storageFolder + ") not existing in system.");
        for (const folder of folders) {
            const absoluteFolder = join(storageFolder, folder);
            if (!existsSync(absoluteFolder)) {
                mkdirpSync(absoluteFolder);
                console.log("StorageService:: Generated Folder: " + folder);
            }
            // throw new Error("StorageService::Folder not found (" + absoluteFolder + ").");
        }
    }
    createFolder() {
        const storageFolder = this.configService.storage;
        const absoluteFolder = join(storageFolder, ...arguments);
        return mkdirpSync(absoluteFolder);
    }

    createCsvFile = (task) => {
        const storageFolder = this.configService.storage;
        return new Promise((resolve, reject) => {
            if (storageFolder == null)
                return reject(new Error("Missing FILE_STORAGE."))
            const {
                filename,
                data,
                fields
            } = task;

            const filePath = join(storageFolder, filename);

            var rowsCollector = [];
            for (const row of data) {
                const rowCollector = [];
                for (const field of fields)
                    rowCollector.push(row[field] != null ? row[field] : "");
                rowsCollector.push(rowCollector);
            }

            const buffer = this.generateCsv(rowsCollector);

            writeFile(filePath, buffer, (err) => {
                if (err) reject(err);
                else resolve();
            })
        });
    }
    fileList(folder, opts: any = {}) {
        let files = this.fileListRecursive(folder);
        if (opts.onlyFile === true)
            files = files.map(v => parse(v).base);
        return files;
    };

    // [[value]] >>> value,value\n 
    generateCsv(list) {
        return list.map((l) => l.join(',')).join('\n');
    }

    fileListRecursive(dir, files_?: any) {
        files_ = files_ || [];
        let files = readdirSync(dir);
        for (let i in files) {
            let name = dir + '/' + files[i];
            if (statSync(name).isDirectory())
                this.fileListRecursive(name, files_);
            else
                files_.push(name);
        }
        return files_;
    }

    zipBlob(data) {
        return new Promise((resolve, reject) => {
            zlib.gzip(data, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        })
    }
    unzipBlob(data) {
        return new Promise((resolve, reject) => {
            zlib.gunzip(data, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        })
    }
}
