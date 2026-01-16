import { Module } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerController } from './server.controller';
import { ServerRepository } from './server.respository';
import { PrismaService } from 'src/prisma.service';

@Module({
	controllers: [
		ServerController
	],
	providers: [
		ServerService, 
		ServerRepository, 
		PrismaService
	],
	exports: [
		ServerService
	]
})
export class ServerModule { }
