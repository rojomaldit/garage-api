import { IsBoolean } from '@nestjs/class-validator';
import { IsOptional } from 'class-validator';

export class VehicleGetOptions {
	// If true return all vehicles that already have a rent
	// If false return all vehicles that don't have a rent
	@IsOptional()
	@IsBoolean()
	rented?: boolean;
}
