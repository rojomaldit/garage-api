import { IsInt } from '@nestjs/class-validator';
import { IsObject } from 'class-validator';
import { Rent } from 'src/rent/models/rent.entity';

export class RentCollectHistoryDTO {
	@IsObject()
	rent: Rent;

	@IsInt()
	amountCollected: number;
}
