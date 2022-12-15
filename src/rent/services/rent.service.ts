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

	async create(rentDTO: RentDTO): Promise<number> {
		const rent = new Rent();
		rent.rentType = rentDTO.rentType;
		rent.amountForTime = rentDTO.amountForTime;
		rent.vehicle = await this.vehicleService.getOrFail(rentDTO.vehicle);
		rent.placeGarage = await this.placeGarageService.getOrFail(rentDTO.placeGarage);

		try {
			const newRent = await this.rentRepository.save(rent);
			return newRent.id;
		} catch (error) {
			throw new BadRequestException(error);
		} finally {
			await this.placeGarageService.update(rent.placeGarage.id, { isAvailable: false });
		}
	}

	async totalToCollect(): Promise<TotalToCollectProjection> {
		const rents = await this.getAll();
		return new TotalToCollectProjection(rents);
	}
}
