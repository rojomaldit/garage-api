import { Rent, RentType } from '../models/rent.entity';

class TotalToCollectByRentProjection {
	constructor(rentId: number, totalToCollect: number) {
		this.rentId = rentId;
		this.totalToCollect = totalToCollect;
	}
	rentId: number;
	totalToCollect: number;
}

export class TotalToCollectProjection {
	constructor(rents: Rent[]) {
		const totalTime = (startDate: Date, rentType: RentType): number => {
			let getHours = (new Date().getTime() - startDate.getTime()) / 1000 / 60 / 60;
			const ceilHours = Math.ceil(getHours);
			if (ceilHours - getHours < 0.5) getHours = ceilHours;
			switch (rentType) {
				case RentType.Hourly:
					return getHours;
				case RentType.Daily:
					return getHours / 24;
				case RentType.Weekly:
					return getHours / 24 / 7;
				case RentType.Monthly:
					return getHours / 24 / new Date().getDate();
				case RentType.Yearly:
					return getHours / 24 / 365;
			}
		};

		this.totalRents = rents.length;

		this.totalToCollectByRent = rents.map((rent) => ({
			rentId: rent.id,
			totalToCollect: rent.amountForTime * totalTime(rent.lastDateCollected, rent.rentType),
		}));
		this.totalToCollect = this.totalToCollectByRent.reduce((total, rent) => total + rent.totalToCollect, 0);
	}

	totalRents: number;
	totalToCollect: number;

	totalToCollectByRent: TotalToCollectByRentProjection[];
}
