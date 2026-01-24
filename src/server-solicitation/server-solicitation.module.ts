import { Module } from '@nestjs/common';
import { ServerSolicitationService } from './server-solicitation.service';
import { ServerSolicitationController } from './server-solicitation.controller';;
import { ServerModule } from 'src/server/server.module';
import { UsersModule } from 'src/user/user.module';
import { ServerSolicitationRepository } from './server-solicitation.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
	controllers: [ServerSolicitationController],
	providers: [
		ServerSolicitationService,
		ServerSolicitationRepository,
		PrismaService,
	],
	imports: [
		ServerModule,
		UsersModule,
	]
})
export class ServerSolicitationModule { }
