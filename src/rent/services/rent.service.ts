import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/services/base.service';
import { PlaceGarageService } from 'src/placeGarage/services/placeGarage.service';
import { VehicleService } from 'src/vehicle/services/vehicle.service';
import { Repository } from 'typeorm';
import { RentDTO } from '../dtos/rent.dto';
import { Rent } from '../models/rent.entity';
import { TotalToCollectProjection } from '../projections/totalToCollect.projection';

@Injectable()
export class RentService extends BaseService<Rent> {
	constructor(
		@InjectRepository(Rent)
		private readonly rentRepository: Repository<Rent>,
		private readonly vehicleService: VehicleService,
		private readonly placeGarageService: PlaceGarageService
	) {
		super(rentRepository);
	}

	async validateRent(rentDTO: RentDTO) {
		const placeGarage = await this.placeGarageService.getOrFail(rentDTO.placeGarage);
		const vehicle = await this.vehicleService.getOrFail(rentDTO.vehicle, { relations: ['rents'] });

		if (!placeGarage.isAvailable) throw new BadRequestException('Place garage is not available');
		if (vehicle.rents.length) throw new BadRequestException('Vehicle is already rented');

		return { placeGarage, vehicle };
	}

	async create(rentDTO: RentDTO): Promise<number> {
		const rent = new Rent();
		rent.rentType = rentDTO.rentType;
		rent.amountForTime = rentDTO.amountForTime;

		const { vehicle, placeGarage } = await this.validateRent(rentDTO);
		rent.vehicle = vehicle;
		rent.placeGarage = placeGarage;

		const newRent = await this.rentRepository.save(rent);
		await this.placeGarageService.update(rent.placeGarage.id, { isAvailable: false });
		return newRent.id;
	}

	async totalToCollect(): Promise<TotalToCollectProjection> {
		const rents = await this.getAll();
		return new TotalToCollectProjection(rents);
	}
}
