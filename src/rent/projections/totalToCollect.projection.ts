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
			const getHours = (new Date().getTime() - startDate.getTime()) / 1000 / 60 / 60;
			switch (rentType) {
				case RentType.hs:
					return getHours;
				case RentType.ds:
					return getHours / 24;
				case RentType.ws:
					return getHours / 24 / 7;
				case RentType.ms:
					return getHours / 24 / new Date().getDate();
				case RentType.yrs:
					return getHours / 24 / 365;
			}
		};

		this.totalRents = rents.length;

		this.totalToCollectByRent = rents.map((rent) => ({
			rentId: rent.id,
			totalToCollect: rent.amountForTime * totalTime(rent.startDate, rent.rentType),
		}));
		this.totalToCollect = this.totalToCollectByRent.reduce((total, rent) => total + rent.totalToCollect, 0);
	}

	totalRents: number;
	totalToCollect: number;

	totalToCollectByRent: TotalToCollectByRentProjection[];
}
