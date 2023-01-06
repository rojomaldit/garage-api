import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from '../dtos/user.dto';
import { User } from '../models/user.entity';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async create(@Body() user: UserDTO): Promise<User> {
		return this.userService.createUser(user);
	}
}
