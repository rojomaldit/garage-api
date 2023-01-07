import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/services/base.service';
import { In, Repository } from 'typeorm';
import { VehicleGetOptions } from '../dtos/getOptions.dto';
import { UpdateVehicleDTO } from '../dtos/updateVehicle.dto';
import { VehicleDTO } from '../dtos/vehicle.dto';
import { Vehicle } from '../models/vehicle.entity';

@Injectable()
export class VehicleService extends BaseService<Vehicle> {
	constructor(
		@InjectRepository(Vehicle)
		private readonly vehicleRepository: Repository<Vehicle>
	) {
		super(vehicleRepository);
	}

	async create(vehicleDTO: VehicleDTO): Promise<Vehicle> {
		const car = await this.getByOptions({
			where: { licensePlate: vehicleDTO.licensePlate },
		});
		if (car)
			throw new BadRequestException(`Already exists a vehicle with this license plate ${vehicleDTO.licensePlate}`);

		const newCar = await this.vehicleRepository.save(vehicleDTO);
		return newCar;
	}

	async findAllWithOptions(options: VehicleGetOptions) {
		let vehicles = await this.getAll({ relations: ['rents'] });

		if (options.rented) {
			vehicles = vehicles.filter((v) => v.rents.filter((r) => !r.deletedAt).length);
		} else {
			vehicles = vehicles.filter((v) => !v.rents.filter((r) => !r.deletedAt).length);
		}

		return vehicles.length ? this.getAll({ where: { id: In(vehicles.map((v) => v.id)) } }) : [];
	}

	async updateVehicle(updateDTO: UpdateVehicleDTO) {
		const vehicle = await this.getOrFail(updateDTO.vehicleId);

		if (updateDTO.licensePlate) {
			const car = await this.getByOptions({
				where: { licensePlate: updateDTO.licensePlate },
			});
			if (car && car.id !== vehicle.id)
				throw new BadRequestException(`Already exists a vehicle with this license plate ${updateDTO.licensePlate}`);
		}
		if (updateDTO.email) {
			const car = await this.getByOptions({
				where: { email: updateDTO.email },
			});
			if (car && car.id !== vehicle.id)
				throw new BadRequestException(`Already exists a vehicle with this email ${updateDTO.email}`);
			vehicle.email = updateDTO.email;
		}
		if (updateDTO.deleteAfterRent) {
			vehicle.deleteAfterRent = updateDTO.deleteAfterRent;
		}
		if (updateDTO.address) {
			vehicle.address = updateDTO.address;
		}
		if (updateDTO.name) {
			vehicle.name = updateDTO.name;
		}
		if (updateDTO.notes) {
			vehicle.notes = updateDTO.notes;
		}
		if (updateDTO.phoneNumber) {
			vehicle.phoneNumber = updateDTO.phoneNumber;
		}
		if (updateDTO.vehicleType) {
			vehicle.vehicleType = updateDTO.vehicleType;
		}

		await this.update(vehicle.id, vehicle);
	}
}
