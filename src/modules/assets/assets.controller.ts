import { Controller, Get, Param, Res } from '@nestjs/common';
import { AssetsService } from './assets.service';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';

@Controller('backend/assets/img')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get()
  getFiles(): string[] {
    return this.assetsService.getFiles();
  }

  @Get(':fileName')
  async getFile(@Param('fileName') fileName: string, @Res() res: Response) {
    try {
      const filePath = this.assetsService.getFileByName(fileName);
      if (fs.existsSync(filePath)) {
        res.sendFile(path.resolve(filePath));
      } else {
        res.status(HttpStatus.NOT_FOUND).json({ message: 'File not found' });
      }
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'An error occurred', error: error.message });
    }
  }
}
