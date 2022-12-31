import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { BaseController } from 'src/base/controllers/base.controller';
import { VehicleGetOptions } from '../dtos/getOptions.dto';
import { VehicleDTO } from '../dtos/vehicle.dto';
import { Vehicle } from '../models/vehicle.entity';
import { VehicleService } from '../services/vehicle.service';

@UseGuards(AuthGuard('jwt'))
@Controller('vehicle')
export class VehicleController extends BaseController<Vehicle> {
	constructor(private readonly vehicleService: VehicleService) {
		super(vehicleService);
	}

	@Get("/options")
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiResponse({ status: 400, description: 'Bad Request.' })
	@ApiResponse({ status: 200, description: 'Ok' })
	async findAllWithOptions(@Body() options: VehicleGetOptions) {
		return this.vehicleService.findAllWithOptions(options)
	}

	@Post()
	@ApiResponse({ status: 201, description: 'The record has been successfully created.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiResponse({ status: 400, description: 'Bad Request.' })
	async create(@Body() vehicleDTO: VehicleDTO): Promise<Vehicle> {
		return this.vehicleService.create(vehicleDTO);
	}

	@Delete(':id')
	@ApiResponse({ status: 200, description: 'The record has been successfully deleted.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiResponse({ status: 400, description: 'Bad Request.' })
	async delete(@Param('id') id: number) {
		await this.vehicleService.delete(
			id,
			{ relations: ['rents'] },
			(vehicle) => !vehicle.rents.filter((r) => !r.deletedAt).length // If the vehicle has rents, it can't be deleted
		);
	}
}
