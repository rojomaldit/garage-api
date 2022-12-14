import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleModule } from './vehicle/vehicle.module';
import { AuthModule } from './auth/auth.module';
import { PlaceGarageModule } from './placeGarage/placeGarage.module';
import { SnakeNamingStrategy } from 'typeorm-snake-naming-strategy';
import { RentModule } from './rent/rent.module';
import { RentCollectedHistoryModule } from './rentCollectedHistory/rentCollectedHostory.module';

@Module({
	imports: [
		// TODO: move to config file or env variables
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
				password: 'mutants321',
			database: 'garage',
			entities: ['dist/**/*.entity{.ts,.js}'],
			synchronize: true,
			retryAttempts: 2,
			retryDelay: 2000,
			namingStrategy: new SnakeNamingStrategy(),
		}),
		VehicleModule,
		PlaceGarageModule,
		RentModule,
		AuthModule,
		RentCollectedHistoryModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
