import { IsEnum } from '@nestjs/class-validator';
import { IsInt, IsOptional } from 'class-validator';
import { RentType } from '../models/rent.entity';

export class UpdateRentDTO {
	@IsInt()
	rentId: number;

	@IsOptional()
	@IsEnum(RentType)
	rentType: RentType;

	@IsOptional()
	@IsInt()
	amountForTime: number;

	@IsOptional()
	@IsInt()
	vehicleId: number;

	@IsOptional()
	@IsInt()
	placeGarageId: number;
}
