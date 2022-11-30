import { Injectable } from '@nestjs/common';
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

	async create(vehicleDTO: VehicleDTO): Promise<number> {
		const newCar = await this.vehicleRepository.save(vehicleDTO);
		return newCar.id;
	}	
}
