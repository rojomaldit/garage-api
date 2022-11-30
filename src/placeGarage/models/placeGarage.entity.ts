import { Base } from 'src/base/models/base.entity';
import { Rent } from 'src/rent/models/rent.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';

export enum PlaceGarageType {
	COVERED = 'Covered',
	UNCOVERED = 'Uncovered',
}

@Entity()
export class PlaceGarage extends Base {
	@Column({ nullable: false })
	placeId: string;

	@Column({ nullable: false, type: 'enum', enum: PlaceGarageType })
	placeGarageType: PlaceGarageType;

  @OneToMany(() => Rent, (rent) => rent.placeGarage)
	rents: Rent[];
}
