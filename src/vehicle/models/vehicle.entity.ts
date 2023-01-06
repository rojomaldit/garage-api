import { Base } from 'src/base/models/base.entity';
import { Rent } from 'src/rent/models/rent.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

export enum VehicleType {
	CAR = 'Car',
	VAN = 'Van',
	MOTORCYCLE = 'Motorcycle',
	BIKE = 'Bike',
	TRUCK = 'Truck',
}

@Entity()
export class Vehicle extends Base {
	@Column({ length: 15, nullable: false })
	licensePlate: string;

	@Column({ nullable: false, type: 'enum', enum: VehicleType })
	vehicleType: VehicleType;

	@Column({ nullable: true })
	phoneNumber: string;

	@Column({ nullable: true, default: false })
	deleteAfterRent: boolean;

	@Column({ nullable: true })
	address: string;

	@Column({ nullable: true })
	notes: string;

	@OneToMany(() => Rent, (rent) => rent.vehicle)
	rents: Rent[];
}
