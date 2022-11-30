import { Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Base } from '../models/base.entity';
import { BaseService } from '../services/base.service';

export class BaseController<T extends Base> {
	constructor(private readonly baseService: BaseService<T>) {}

	@Get()
	@ApiResponse({ status: 200, description: 'Ok' })
	async findAll(): Promise<T[]> {
		return this.baseService.getAll();
	}

	@Get(':id')
	@ApiResponse({ status: 200, description: 'Entity retrieved successfully.' })
	@ApiResponse({ status: 404, description: 'Entity does not exist' })
	async findById(@Param('id') id: number): Promise<T> {
		return this.baseService.get(id);
	}
}
