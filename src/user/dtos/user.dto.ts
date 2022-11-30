import { IsOptional, IsString } from '@nestjs/class-validator';

export class UserDTO {
	@IsString()
	username: string;

	@IsString()
	password: string;

	@IsString()
	firstName: string;

	@IsString()
	lastName: string;

	@IsString()
	email: string;

	@IsString()
	phone: string;

	@IsOptional()
	roles?: string[];
}