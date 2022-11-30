import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceGarage } from './models/placeGarage.entity';

@Module({
	imports: [TypeOrmModule.forFeature([PlaceGarage])],
	controllers: [],
	providers: [],
	exports: [],
})
export class PlaceGarageModule {}
