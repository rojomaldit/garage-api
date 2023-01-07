import { IsString } from '@nestjs/class-validator';
import { IsBoolean, IsEnum, IsInt, IsOptional } from 'class-validator';
import { VehicleType } from '../models/vehicle.entity';

export class UpdateVehicleDTO {
	@IsInt()
	vehicleId: number;

	@IsOptional()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	email: string;

	@IsOptional()
	@IsString()
	licensePlate: string;

	@IsOptional()
	@IsEnum(VehicleType)
	vehicleType: VehicleType;

	@IsOptional()
	@IsString()
	phoneNumber: string;

	@IsOptional()
	@IsBoolean()
	deleteAfterRent: boolean;

	@IsOptional()
	@IsString()
	address: string;

	@IsOptional()
	@IsString()
	notes: string;
}
