import { Exclude } from 'class-transformer';
import { Column, PrimaryGeneratedColumn, BeforeUpdate, DeleteDateColumn } from 'typeorm';

export class Base {
	@PrimaryGeneratedColumn()
	id: number;

	@Exclude()
	@Column({ default: () => `now()` })
	createdAt: Date;

	@Exclude()
	@Column({ nullable: true })
	updatedAt: Date;

	@Exclude()
	@DeleteDateColumn()
	deletedAt?: Date;

	@BeforeUpdate()
	setUpdatedAt() {
		this.updatedAt = new Date();
	}
}