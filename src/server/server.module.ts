import { Module } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerController } from './server.controller';
import { ServerRepository } from './server.respository';
import { PrismaService } from 'src/prisma.service';
import { LocalStorageService } from 'src/storage/local-storage';

@Module({
	controllers: [
		ServerController
	],
	providers: [
		ServerService, 
		ServerRepository, 
		PrismaService,
		LocalStorageService
	],
	exports: [
		ServerService
	]
})
export class ServerModule { }
