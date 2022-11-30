import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { UserDTO } from '../dtos/user.dto';
import { User } from '../models/user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	) {}

	async create(user: UserDTO): Promise<User> {
		const findUser = await this.userRepository.findOne({ username: user.username });
		if (findUser) throw new Error('User already exists');

		const newUser: User = plainToClass(User, user);

		return await this.userRepository.save(newUser);
	}

	getUserByUserName(username: string): Promise<User> {
		return this.userRepository.findOne({ username });
	}
}
