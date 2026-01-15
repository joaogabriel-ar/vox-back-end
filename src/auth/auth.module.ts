import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UsersModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		UsersModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => {
				const secret = configService.get<string>('JWT_SECRET');
				if (!secret) {
					throw new Error('JWT_SECRET environment variable is not set');
				}

				return {
					global: true,
					secret,
					signOptions: {
						expiresIn: '1h'
					},
				};
			},
			inject: [ConfigService],
		}),
	],
	providers: [
		AuthService,
		UsersModule,
		JwtStrategy
	],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule { }