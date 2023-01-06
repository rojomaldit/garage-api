import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/services/base.service';
import { RentType } from 'src/rent/models/rent.entity';
import { Repository } from 'typeorm';
import { RentCollectHistoryDTO } from '../dtos/rentCollectHistoryDTO.dto';
import { RentCollectedHistory } from '../models/rentCollectedHistory.entity';
import { RentCollectedHistoryProjection } from '../projection/rentCollectedHistory.projection';

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
		rentCollectedHistory.rent = rentCollectHistoryDTO.rent;
		rentCollectedHistory.amountCollected = rentCollectHistoryDTO.amountCollected;
		rentCollectedHistory.dateCollected = new Date();

		switch (rentCollectHistoryDTO.rent.rentType) {
			case RentType.Hourly:
				rentCollectedHistory.moment = new Date().getHours();
				break;
			case RentType.Daily:
				rentCollectedHistory.moment = new Date().getDate();
				break;
			case RentType.Weekly:
				rentCollectedHistory.moment = new Date().getDay();
				break;
			case RentType.Monthly:
				rentCollectedHistory.moment = new Date().getMonth() + 1;
				break;
			case RentType.Yearly:
				rentCollectedHistory.moment = new Date().getFullYear();
				break;
		}

		return this.create(rentCollectedHistory);
	}

	async getRentCollectedHistory(type: RentType) {
		let rentCollectedHistory = (await this.getAll({ relations: ['rent'] })).filter(
			(rent) => rent.rent.rentType === type
		);

		switch (type) {
			case RentType.Hourly:
				rentCollectedHistory = rentCollectedHistory.filter((rent) => {
					const diff = new Date().getTime() - rent.dateCollected.getTime();
					return diff < 86400000; // One day in milliseconds
				});

			case RentType.Daily:
			case RentType.Weekly:
				rentCollectedHistory = rentCollectedHistory.filter((rent) => {
					const thisMonth = new Date().getMonth();
					const thisYear = new Date().getFullYear();

					return rent.dateCollected.getMonth() === thisMonth && rent.dateCollected.getFullYear() === thisYear;
				});

			case RentType.Monthly:
				rentCollectedHistory = rentCollectedHistory.filter((rent) => {
					const thisYear = new Date().getFullYear();

					return rent.dateCollected.getFullYear() === thisYear;
				});
		}

		const historyProjected = new RentCollectedHistoryProjection(rentCollectedHistory, type);

		// Group by collectedOn and sum amountCollected
		historyProjected.history = historyProjected.history.reduce((acc, curr) => {
			const found = acc.find((item) => item.collectedOn === curr.collectedOn);
			if (found) {
				found.amountCollected += curr.amountCollected;
			} else {
				acc.push(curr);
			}
			return acc;
		}, []).sort((a, b) => a.collectedOn - b.collectedOn);

		return historyProjected;
	}
}
