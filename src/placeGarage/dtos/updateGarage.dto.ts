import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateGarageDTO {
	@IsInt()
	garageId: number;

	@IsOptional()
	@IsString()
	placeId: string;
}
