import { IsString } from '@nestjs/class-validator';

export class LoginDTO {
	@IsString()
	username: string = "";

	@IsString()
	password: string = "";
}
