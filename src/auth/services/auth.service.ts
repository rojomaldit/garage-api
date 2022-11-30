import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user.service';
import { JWTPayload } from '../interface/payload.interface';

@Injectable()
export class AuthService {
	constructor(private usersService: UserService, private jwtService: JwtService) {}

	async validateUser(username: string, pass: string): Promise<boolean> {
		const user = await this.usersService.getUserByUserName(username);
		if(!user) return false;
		return await user.validatePassword(pass);
	}

	async generateAccessToken(name: string) {
		const user = await this.usersService.getUserByUserName(name);
		const payload: JWTPayload = { username: user.username };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
