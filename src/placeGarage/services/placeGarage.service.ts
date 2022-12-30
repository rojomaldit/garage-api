import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/services/base.service';
import { Repository } from 'typeorm';
import { PlaceGarageDTO } from '../dtos/placeGarage.dto';
import { PlaceGarage } from '../models/placeGarage.entity';

@Injectable()
export class PlaceGarageService extends BaseService<PlaceGarage> {
	constructor(
		@InjectRepository(PlaceGarage)
		private readonly placeGarageRepository: Repository<PlaceGarage>
	) {
		super(placeGarageRepository);
	}

	async create(placeGarageDTO: PlaceGarageDTO): Promise<PlaceGarage> {
		const car = await this.getByOptions({ where: { placeId: placeGarageDTO.placeId } });
		if (car) throw new BadRequestException(`Already exists a PlaceGarage with id ${placeGarageDTO.placeId}`);

		const newPlace = await this.placeGarageRepository.save(placeGarageDTO);
		return newPlace;
	}
}
