import { IsNumber, IsObject } from 'class-validator';
import { Rent } from 'src/rent/models/rent.entity';

export class RentCollectHistoryDTO {
	@IsObject()
	rent: Rent;

	@IsNumber()
	amountCollected: number;
}
