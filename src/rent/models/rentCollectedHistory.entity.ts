import { Base } from 'src/base/models/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Rent } from './rent.entity';

@Entity()
export class RentCollectedHistory extends Base {
	@Column({ nullable: false, default: 0 })
	amountCollected: number;

	@ManyToOne(() => Rent, (pg) => pg.rentCollectedHistory)
	Rent: Rent;
}
