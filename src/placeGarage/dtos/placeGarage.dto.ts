import { IsString } from '@nestjs/class-validator';
import { IsBoolean, IsEnum, IsInt, IsOptional } from 'class-validator';

export class PlaceGarageDTO {
	@IsString()
	placeId: string;

  @IsOptional()
	@IsBoolean()
	isAvailable?: true;
}
