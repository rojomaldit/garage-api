import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/models/user.entity';
import { UserService } from 'src/user/services/user.service';
import { JWTPayload } from '../interface/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private usersService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: "secret_key", // TODO: move to env
		});
	}

	async validate(payload: JWTPayload): Promise<User> {
		const user = await this.usersService.getUserByUserName(payload.username);
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
