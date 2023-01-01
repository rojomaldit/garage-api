import { Base } from 'src/base/models/base.entity';
import { Rent } from 'src/rent/models/rent.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class RentCollectedHistory extends Base {
	@Column({ default: () => `now()` })
	dateCollected: Date;

	// Determine the moment of the day the rent was collected
	// if the rent is hourly, the moment will be the hour
	// if the rent is daily, the moment will be the day
	// ...
	@Column({ nullable: false, default: 0 })
	moment: number;

	@Column({ nullable: false, default: 0 })
	amountCollected: number;

	@ManyToOne(() => Rent, (pg) => pg.rentCollectedHistory)
	rent: Rent;
}
