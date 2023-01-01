import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/services/base.service';
import { Repository } from 'typeorm';
import { RentCollectHistoryDTO } from '../dtos/rent.dto';
import { RentCollectedHistory } from '../models/rentCollectedHistory.entity';

@Injectable()
export class RentCollectedHistoryService extends BaseService<RentCollectedHistory> {
	constructor(
		@InjectRepository(RentCollectedHistory)
		private readonly rentCollectedHistoryRepository: Repository<RentCollectedHistory>
	) {
		super(rentCollectedHistoryRepository);
	}

	async createNewRentCollectedHistory(rentCollectHistoryDTO: RentCollectHistoryDTO): Promise<RentCollectedHistory> {
		const rentCollectedHistory = new RentCollectedHistory();
		rentCollectedHistory.Rent = rentCollectHistoryDTO.rent;
		rentCollectedHistory.amountCollected = rentCollectHistoryDTO.amountCollected;
		return this.create(rentCollectedHistory);
	}
}
