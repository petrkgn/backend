import { Module } from '@nestjs/common';
import { AssetsController } from './modules/assets/assets.controller';
import { AssetsService } from './modules/assets/assets.service';
import { AssetsModule } from './modules/assets/assets.module';

@Module({
  imports: [AssetsModule],
  controllers: [AssetsController],
  providers: [AssetsService],
})
export class AppModule {}
