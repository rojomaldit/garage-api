import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentCollectedHistory } from './models/rentCollectedHistory.entity';
import { RentCollectedHistoryService } from './services/rentCollectedHistory.service';

@Module({
	imports: [TypeOrmModule.forFeature([RentCollectedHistory]), RentCollectedHistory],
	controllers: [],
	providers: [RentCollectedHistoryService],
	exports: [RentCollectedHistoryService],
})
export class RentCollectedHistoryModule {}
