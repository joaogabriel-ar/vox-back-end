
import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { Public } from 'src/decorators/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import currentUserDecorator from './guard/current-user.decorator';
import { UserNotAuthenticatedException } from './exceptions/user-not-authenticated.exception';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import type { IAuthUser } from 'src/interfaces/authUser.interface';

@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) { }

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post('login')
	async signIn(@Body() signInDto: LoginDto, @Res({ passthrough: true }) response) {

		let { access_token } = await this.authService.signIn(signInDto);

		response.cookie('access_token', access_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 3600000,
		});

		return { message: "Login successfull !" }; 
	}

	@Get('me')
	me(@currentUserDecorator() user: IAuthUser) {

		if (!user) {
			throw new UserNotAuthenticatedException();
		}

		return user;

	}

}
