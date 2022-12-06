import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { BaseController } from 'src/base/controllers/base.controller';
import { RentDTO } from '../dtos/rent.dto';
import { Rent } from '../models/rent.entity';
import { TotalToCollectProjection } from '../projections/totalToCollect.projection';
import { RentService } from '../services/rent.service';

@UseGuards(AuthGuard('jwt'))
@Controller('rent')
export class RentController extends BaseController<Rent> {
	constructor(private readonly rentService: RentService) {
		super(rentService);
	}

	@Post()
	@ApiResponse({ status: 201, description: 'The record has been successfully created.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiResponse({ status: 400, description: 'Bad Request.' })
	async create(@Body() rentDTO: RentDTO): Promise<number> {
		return this.rentService.create(rentDTO);
	}

	@Get('total-to-collect')
	@ApiResponse({ status: 201, description: 'The record has been successfully created.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiResponse({ status: 400, description: 'Bad Request.' })
	async totalToCollect(): Promise<TotalToCollectProjection> {
		return this.rentService.totalToCollect();
	}
}
