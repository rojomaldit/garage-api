import { IsString } from '@nestjs/class-validator';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { PlaceGarageType } from '../models/placeGarage.entity';

export class PlaceGarageDTO {
	@IsString()
	placeId: string;

  @IsOptional()
	@IsEnum(PlaceGarageType)
	placeGarageType?: PlaceGarageType = PlaceGarageType.UNCOVERED;
}
