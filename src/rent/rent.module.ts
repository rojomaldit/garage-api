import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rent } from './models/rent.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Rent])],
	controllers: [],
	providers: [],
	exports: [],
})
export class RentModule {}
