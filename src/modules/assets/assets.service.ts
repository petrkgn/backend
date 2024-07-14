import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AssetsService {
  private readonly assetsFolder: string;

  constructor() {
    this.assetsFolder = path.join(process.cwd(), 'src', 'assets', 'img');

    if (!fs.existsSync(this.assetsFolder)) {
      throw new Error(`Assets folder not found: ${this.assetsFolder}`);
    }
  }

  getFiles(): string[] {
    try {
      return fs.readdirSync(this.assetsFolder);
    } catch (err) {
      throw new Error('Unable to scan directory: ' + err);
    }
  }

  getFileByName(fileName: string): string {
    const filePath = path.join(this.assetsFolder, fileName);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException(`File not found: ${fileName}`);
    }
    return filePath;
  }
}
