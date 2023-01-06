import { Exclude, Type } from 'class-transformer';
import { Base } from 'src/base/models/base.entity';
import { BeforeInsert, Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm';
import { Role } from './role.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends Base {
	@Column({ length: 20 })
	@Index({ unique: true })
	username: string;

	@Column({ length: 100 })
	@Exclude({ toPlainOnly: true })
	password: string;

	@Column({ length: 30 })
	firstName: string;

	@Column({ length: 30 })
	lastName: string;

	@Column()
	email: string;

	@Column()
	phone: string;

	@Type(() => Role)
	@ManyToMany(() => Role, { cascade: true })
	@JoinTable()
	roles: Role[];

	@BeforeInsert()
	async hashPassword() {
		const salt = await bcrypt.genSalt();
		this.password = await bcrypt.hash(this.password, salt);
	}

	async validatePassword(password: string): Promise<boolean> {
		return await bcrypt.compareSync(password, this.password);
	}
}
