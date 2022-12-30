import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/services/base.service';
import { Repository } from 'typeorm';
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
		const car = await this.getByOptions({ where: { licensePlate: vehicleDTO.licensePlate } });
		if (car)
			throw new BadRequestException(`Already exists a vehicle with this license plate ${vehicleDTO.licensePlate}`);

		const newCar = await this.vehicleRepository.save(vehicleDTO);
		return newCar;
	}
}
