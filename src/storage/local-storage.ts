import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fsPromises from 'fs/promises';
import fs from 'fs';
import path from 'path';

@Injectable()
export class LocalStorageService {

    private root = path.resolve(process.env.LOCAL_STORAGE_ROOT || './uploads');

    constructor() {
        fs.mkdirSync(this.root, { recursive: true })
    }

    async saveFile(
        file: Express.Multer.File,
        dirPath: string
    ): Promise<string | undefined> {

        try {

            const destinationPath = path.join(this.root, dirPath);

            await this.ensureDirectoryExists(destinationPath);

            const extention = file.mimetype.split("/")[1];

            const fileName = `${Date.now()}.${extention}`;

            const filePath = path.join(destinationPath, fileName);

            await fsPromises.writeFile(filePath, file.buffer);

            const relativePath = path.relative(this.root, filePath);

            return relativePath;

        } catch (err: any) {

            console.log({ err });
            
            throw new InternalServerErrorException("Fail to save image");

        }

    }

    async getImage(filePath: string): Promise<Buffer> {
        
        const destinationPath = path.join(this.root, filePath);

        try {

            const imageBuffer = await fs.promises.readFile(destinationPath);
            
            return imageBuffer;

        } catch (error) {
            console.log(error);
            
            if (error.code === 'ENOENT') {
                throw new Error(`Image not found: ${filePath}`);
            }

            throw error;
        }
    }

    async removeFile(filePath: string) {

        const destinationPath = path.join(this.root, filePath);

        try {

            await fs.promises.unlink(destinationPath);

        } catch (error) {

            if (error.code !== 'ENOENT') {
                throw error;
            }
        }
    }


    private async ensureDirectoryExists(dirPath: string): Promise<void> {

        try {
            await fsPromises.access(dirPath);
        } catch (error) {
            await fsPromises.mkdir(dirPath, { recursive: true });
        }
    }

}
