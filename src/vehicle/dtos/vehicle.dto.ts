import { IsEnum, IsString } from '@nestjs/class-validator';
import { IsOptional } from 'class-validator';
import { VehicleType } from '../models/vehicle.entity';

export class VehicleDTO {
	@IsString()
	licensePlate: string;

	@IsEnum(VehicleType)
	vehicleType: VehicleType;

	@IsString()
	@IsOptional()
	phoneNumber?: string;

	@IsString()
	@IsOptional()
	address?: string;

	@IsString()
	@IsOptional()
	notes?: string;
}
