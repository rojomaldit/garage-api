import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { RentType } from '../models/rent.entity';

export class RentDTO {
	@IsEnum(RentType)
	rentType: RentType;

	@IsInt()
	amountForTime: number;

	@IsInt()
	vehicle: number;

	@IsInt()
	placeGarage: number;
}
