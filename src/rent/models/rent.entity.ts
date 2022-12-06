import { Base } from 'src/base/models/base.entity';
import { PlaceGarage } from 'src/placeGarage/models/placeGarage.entity';
import { Vehicle } from 'src/vehicle/models/vehicle.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

export enum RentType {
	hs = 'Hourly',
	ds = 'Daily',
	ws = 'Weekly',
	ms = 'Monthly',
	yrs = 'Yearly',
}

@Entity()
export class Rent extends Base {
	@Column({ nullable: false, type: 'enum', enum: RentType })
	rentType: RentType;

	@Column({ nullable: false, default: 0 })
	amountForRent: number;

	@Column({ nullable: false, default: 0 })
	totalAmount: number;

	@OneToOne(() => Vehicle, (vehicle) => vehicle.rent)
	@JoinColumn()
	vehicle: Vehicle;

	@ManyToOne(() => PlaceGarage, (pg) => pg.rents)
  placeGarage: PlaceGarage
}