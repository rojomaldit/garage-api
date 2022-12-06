import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
	async create(@Body() placeGarageDTO: PlaceGarageDTO): Promise<number> {
		return this.placeGarageService.create(placeGarageDTO);
	}
}
