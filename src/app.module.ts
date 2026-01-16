import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'prisma/config';
import { PassportModule } from '@nestjs/passport';
import { ServerModule } from './server/server.module';

@Module({
	imports: [
		PassportModule,
		UsersModule,
		ServerModule,
		AuthModule,
		JwtModule.register({
			global: true,
			secret: env("JWT_SECRET"),
			signOptions: { expiresIn: '1h' },
		}),
		ServerModule,
	],
})
export class AppModule { }
