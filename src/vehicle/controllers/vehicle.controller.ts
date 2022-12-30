import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { BaseController } from 'src/base/controllers/base.controller';
import { VehicleDTO } from '../dtos/vehicle.dto';
import { Vehicle } from '../models/vehicle.entity';
import { VehicleService } from '../services/vehicle.service';

@UseGuards(AuthGuard('jwt'))
@Controller('vehicle')
export class VehicleController extends BaseController<Vehicle> {
	constructor(private readonly vehicleService: VehicleService) {
		super(vehicleService);
	}

	@Post()
	@ApiResponse({ status: 201, description: 'The record has been successfully created.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiResponse({ status: 400, description: 'Bad Request.' })
	async create(@Body() vehicleDTO: VehicleDTO): Promise<Vehicle> {
		return this.vehicleService.create(vehicleDTO);
	}
}
