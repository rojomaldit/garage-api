import { Base } from 'src/base/models/base.entity';
import { Column, Entity } from 'typeorm';

export enum UserRole {
	admin = 'admin',
	user = 'user',
}

export const RoleOrder = {
	admin: 0,
	user: 1,
};

@Entity()
export class Role extends Base {
	@Column()
	role: UserRole;
}
