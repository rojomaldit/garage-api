import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceGarageController } from './controllers/placeGarage.controller';
import { PlaceGarage } from './models/placeGarage.entity';
import { PlaceGarageService } from './services/placeGarage.service';

@Module({
	imports: [TypeOrmModule.forFeature([PlaceGarage])],
	controllers: [PlaceGarageController],
	providers: [PlaceGarageService],
	exports: [PlaceGarageService],
})
export class PlaceGarageModule {}
