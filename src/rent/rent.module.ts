import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceGarage } from 'src/placeGarage/models/placeGarage.entity';
import { PlaceGarageService } from 'src/placeGarage/services/placeGarage.service';
import { RentCollectedHistory } from 'src/rentCollectedHistory/models/rentCollectedHistory.entity';
import { RentCollectedHistoryService } from 'src/rentCollectedHistory/services/rentCollectedHistory.service';
import { Vehicle } from 'src/vehicle/models/vehicle.entity';
import { VehicleService } from 'src/vehicle/services/vehicle.service';
import { RentController } from './controllers/rent.controller';
import { Rent } from './models/rent.entity';
import { RentService } from './services/rent.service';

@Module({
	imports: [TypeOrmModule.forFeature([Rent, Vehicle, PlaceGarage, RentCollectedHistory])],
	controllers: [RentController],
	providers: [RentService, VehicleService, PlaceGarageService, RentCollectedHistoryService],
	exports: [RentService],
})
export class RentModule {}
