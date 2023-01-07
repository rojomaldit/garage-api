import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/services/base.service';
import { PlaceGarageService } from 'src/placeGarage/services/placeGarage.service';
import { RentCollectHistoryDTO } from 'src/rentCollectedHistory/dtos/rentCollectHistoryDTO.dto';
import { RentCollectedHistoryService } from 'src/rentCollectedHistory/services/rentCollectedHistory.service';
import { VehicleService } from 'src/vehicle/services/vehicle.service';
import { Repository } from 'typeorm';
import { RentDTO } from '../dtos/rent.dto';
import { UpdateRentDTO } from '../dtos/updateRent.dto';
import { Rent } from '../models/rent.entity';
import { TotalToCollectProjection } from '../projections/totalToCollect.projection';

@Injectable()
export class RentService extends BaseService<Rent> {
	constructor(
		@InjectRepository(Rent)
		private readonly rentRepository: Repository<Rent>,
		private readonly vehicleService: VehicleService,
		private readonly placeGarageService: PlaceGarageService,
		private readonly rentCollectedHistoryService: RentCollectedHistoryService
	) {
		super(rentRepository);
	}

	async updateRent(rentDTO: UpdateRentDTO) {
		const rent = await this.getOrFail(rentDTO.rentId);

		if (rentDTO.vehicleId) {
			const vehicle = await this.vehicleService.getOrFail(rentDTO.vehicleId, { relations: ['rents'] });
			if (vehicle.rents.length) throw new BadRequestException('Vehicle is already rented');
			rent.vehicle = vehicle;
		}
		if (rentDTO.placeGarageId) {
			const placeGarage = await this.placeGarageService.getOrFail(rentDTO.placeGarageId);
			if (!placeGarage.isAvailable) throw new BadRequestException('Place garage is not available');
			rent.placeGarage = placeGarage;
		}
		if (rentDTO.rentType) rent.rentType = rentDTO.rentType;
		if (rentDTO.amountForTime) rent.amountForTime = rentDTO.amountForTime;

		await this.update(rent.id, rent);
	}

	async validateRent(rentDTO: RentDTO) {
		const placeGarage = await this.placeGarageService.getOrFail(rentDTO.placeGarage);
		const vehicle = await this.vehicleService.getOrFail(rentDTO.vehicle, { relations: ['rents'] });

		if (!placeGarage.isAvailable) throw new BadRequestException('Place garage is not available');
		if (vehicle.rents.length) throw new BadRequestException('Vehicle is already rented');

		return { placeGarage, vehicle };
	}

	async create(rentDTO: RentDTO): Promise<Rent> {
		const rent = new Rent();
		rent.rentType = rentDTO.rentType;
		rent.amountForTime = rentDTO.amountForTime;

		const { vehicle, placeGarage } = await this.validateRent(rentDTO);
		rent.vehicle = vehicle;
		rent.placeGarage = placeGarage;

		const newRent = await this.rentRepository.save(rent);
		await this.placeGarageService.update(rent.placeGarage.id, { isAvailable: false });
		return newRent;
	}

	/**
	 * Function to get the total to collect from all rents
	 * @returns TotalToCollectProjection
	 */
	async totalToCollect(): Promise<TotalToCollectProjection> {
		const rents = await this.getAll();
		return new TotalToCollectProjection(rents);
	}

	/**
	 * Function to collect rent, it updates the lastDateCollected with the current date
	 * @param rentId Rent id
	 * @returns void
	 */
	async collectRent(rentId: number): Promise<void> {
		const rent = await this.getOrFail(rentId);
		await this.rentRepository.update(rentId, { lastDateCollected: new Date() });

		const totalToCollect = new TotalToCollectProjection([rent]).totalToCollect;

		const newRentCollectHistoryDTO = new RentCollectHistoryDTO();
		newRentCollectHistoryDTO.rent = rent;
		newRentCollectHistoryDTO.amountCollected = totalToCollect;
		await this.rentCollectedHistoryService.createNewRentCollectedHistory(newRentCollectHistoryDTO);
	}

	async cancelRent(rentId: number): Promise<void> {
		const rent = await this.getOrFail(rentId, { relations: ['placeGarage', 'vehicle'] });
		await this.delete(rentId);

		await this.placeGarageService.update(rent.placeGarage.id, { isAvailable: true });

		const vehicle = await this.vehicleService.getOrFail(rent.vehicle.id);
		if (vehicle.deleteAfterRent) await this.vehicleService.delete(vehicle.id);
	}
}
