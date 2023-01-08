import { Body, Controller, Get, Param, Post, UseGuards, Delete, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { BaseController } from 'src/base/controllers/base.controller';
import { RentDTO } from '../dtos/rent.dto';
import { UpdateRentDTO } from '../dtos/updateRent.dto';
import { Rent } from '../models/rent.entity';
import { TotalToCollectProjection } from '../projections/totalToCollect.projection';
import { RentService } from '../services/rent.service';

@UseGuards(AuthGuard('jwt'))
@Controller('rent')
export class RentController extends BaseController<Rent> {
	constructor(private readonly rentService: RentService) {
		super(rentService);
	}

	@Patch()
	@ApiResponse({ status: 200, description: 'The record has been successfully updated.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiResponse({ status: 400, description: 'Bad Request.' })
	async update(@Body() rentDTO: UpdateRentDTO) {
		return this.rentService.updateRent(rentDTO);
	}

	@Post()
	@ApiResponse({ status: 201, description: 'The record has been successfully created.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiResponse({ status: 400, description: 'Bad Request.' })
	async create(@Body() rentDTO: RentDTO): Promise<Rent> {
		return this.rentService.create(rentDTO);
	}

	@Get('total-to-collect')
	@ApiResponse({ status: 201, description: 'The record has been successfully created.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiResponse({ status: 400, description: 'Bad Request.' })
	async totalToCollect(): Promise<TotalToCollectProjection> {
		return this.rentService.totalToCollect();
	}

	@Post('collect/:rentId')
	@ApiResponse({ status: 201, description: 'The record has been successfully created.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiResponse({ status: 400, description: 'Bad Request.' })
	async collect(@Param('rentId') rentId: number): Promise<void> {
		return this.rentService.collectRent(rentId);
	}

	@Delete(':rentId')
	@ApiResponse({ status: 201, description: 'The record has been deleted.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiResponse({ status: 400, description: 'Bad Request.' })
	async cancelRent(@Param('rentId') rentId: number): Promise<void> {
		return this.rentService.cancelRent(rentId);
	}
}
