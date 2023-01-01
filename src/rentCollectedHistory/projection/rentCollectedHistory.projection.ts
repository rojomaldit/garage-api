import { RentType } from 'src/rent/models/rent.entity';
import { RentCollectedHistory } from '../models/rentCollectedHistory.entity';

export class RentCollectedHistoryProjection {
	constructor(data: RentCollectedHistory[], type: RentType) {
		const getTimeByType = (type: RentType, rcd: RentCollectedHistory) => {
			switch (type) {
				case RentType.Hourly:
					return rcd.dateCollected.getHours();
				case RentType.Daily:
					return rcd.dateCollected.getDate();
				case RentType.Weekly:
					return rcd.dateCollected.getDay();
				case RentType.Monthly:
					return rcd.dateCollected.getMonth() + 1;
				case RentType.Yearly:
					return rcd.dateCollected.getFullYear();
			}
		};

		this.type = type;
		this.totalToCollect = data.reduce((acc, curr) => acc + curr.amountCollected, 0);
		this.history = data.map((item) => {
			return {
				amountCollected: item.amountCollected,
				collectedOn: getTimeByType(type, item),
				rentId: item.rent.id,
			};
		});
	}

	type: RentType;
	totalToCollect: number;
	history: CollectedHistoryProjection[];
}

class CollectedHistoryProjection {
	amountCollected: number;
	collectedOn: number;
	rentId: number;
}
