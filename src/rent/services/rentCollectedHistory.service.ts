import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/services/base.service';
import { Repository } from 'typeorm';
import { Rent } from '../models/rent.entity';
import { RentCollectedHistory } from '../models/rentCollectedHistory.entity';

@Injectable()
export class RentCollectedHistoryService extends BaseService<RentCollectedHistory> {
	constructor(
		@InjectRepository(Rent)
		private readonly rentCollectedHistoryRepository: Repository<RentCollectedHistory>
	) {
		super(rentCollectedHistoryRepository);
	}

	async createNewRentCollectedHistory(rent: Rent, amountCollected: number): Promise<RentCollectedHistory> {
		const rentCollectedHistory = new RentCollectedHistory();
		rentCollectedHistory.Rent = rent;
		rentCollectedHistory.amountCollected = amountCollected;
		return this.create(rentCollectedHistory);
	}
}
