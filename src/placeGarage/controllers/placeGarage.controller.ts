import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { BaseController } from 'src/base/controllers/base.controller';
import { PlaceGarageDTO } from '../dtos/placeGarage.dto';
import { PlaceGarage } from '../models/placeGarage.entity';
import { PlaceGarageService } from '../services/placeGarage.service';

@UseGuards(AuthGuard('jwt'))
@Controller('place-garage')
export class PlaceGarageController extends BaseController<PlaceGarage> {
	constructor(private readonly placeGarageService: PlaceGarageService) {
		super(placeGarageService);
	}

	@Post()
	@ApiResponse({ status: 201, description: 'The record has been successfully created.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiResponse({ status: 400, description: 'Bad Request.' })
	async create(@Body() placeGarageDTO: PlaceGarageDTO): Promise<PlaceGarage> {
		return this.placeGarageService.create(placeGarageDTO);
	}

	@Delete(':id')
	@ApiResponse({ status: 200, description: 'The record has been successfully deleted.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiResponse({ status: 400, description: 'Bad Request.' })
	async delete(@Param('id') id: number) {
		await this.placeGarageService.delete(
			id,
			{ relations: ['rents'] },
			(vehicle) => !vehicle.rents.filter((r) => !r.deletedAt).length // If the pg has rents, it can't be deleted
		);
	}
}
