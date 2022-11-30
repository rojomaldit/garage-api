import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from '../dtos/login.dto';
import { AuthService } from '../services/auth.service';

@Controller('login')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post()
	async login(@Body() loginDTO: LoginDTO): Promise<{ access_token: string }> {
		const { username, password } = loginDTO;
		const valid = await this.authService.validateUser(username, password);
		if (!valid) {
			throw new UnauthorizedException();
		}
		return await this.authService.generateAccessToken(username);
	}
}
