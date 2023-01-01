import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentCollectedHistoryController } from './controllers/rentCollectHistory.controller';
import { RentCollectedHistory } from './models/rentCollectedHistory.entity';
import { RentCollectedHistoryService } from './services/rentCollectedHistory.service';

@Module({
	imports: [TypeOrmModule.forFeature([RentCollectedHistory]), RentCollectedHistory],
	controllers: [RentCollectedHistoryController],
	providers: [RentCollectedHistoryService],
	exports: [RentCollectedHistoryService],
})
export class RentCollectedHistoryModule {}
