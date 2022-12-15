import { Base } from 'src/base/models/base.entity';
import { Rent } from 'src/rent/models/rent.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class PlaceGarage extends Base {
	@Column({ nullable: false })
	placeId: string;

	@Column({ nullable: false, default: true })
	isAvailable: boolean;

  @OneToMany(() => Rent, (rent) => rent.placeGarage)
	rents: Rent[];
}
