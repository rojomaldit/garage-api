import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { BaseController } from 'src/base/controllers/base.controller';
import { HistoryOptionsDTO } from '../dtos/historyOptions.dto';
import { RentCollectedHistory } from '../models/rentCollectedHistory.entity';
import { RentCollectedHistoryService } from '../services/rentCollectedHistory.service';

@UseGuards(AuthGuard('jwt'))
@Controller('rent-history')
export class RentCollectedHistoryController extends BaseController<RentCollectedHistory> {
	constructor(private readonly rentHistoryService: RentCollectedHistoryService) {
		super(rentHistoryService);
	}

	@Get()
	@ApiResponse({ status: 201, description: 'The record has been successfully created.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiResponse({ status: 400, description: 'Bad Request.' })
	async getRentCollectedHistory(@Body() historyOptions: HistoryOptionsDTO) {
		return this.rentHistoryService.getRentCollectedHistory(historyOptions.type);
	}
}
