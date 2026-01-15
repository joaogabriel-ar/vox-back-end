
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserNotFoundException } from 'src/user/exceptions/user-not-found.exception';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UserService,
		private jwtService: JwtService
	) { }

	async signIn({ email, password }: LoginDto): Promise<{ access_token: string }> {

		const user = await this.usersService.findEmail(email);

		if(!user) {
			throw new UserNotFoundException();
		}

		if (user.password && !await bcrypt.compare(password, user.password)) {
			throw new InvalidCredentialsException();
		}

		const payload = { id: user.id, name: user.name, email: user.email };

		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
