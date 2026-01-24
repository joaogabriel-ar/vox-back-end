import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Res, Query } from '@nestjs/common';
import { ServerService } from './server.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import currentUserDecorator from 'src/auth/guard/current-user.decorator';
import type { IAuthUser } from 'src/interfaces/authUser.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import path from 'path';
import type { Response } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('servers')
export class ServerController {
	constructor(
		private readonly serverService: ServerService,
	) { }

	@Post()
	@UseInterceptors(FileInterceptor('server_image'))
	async create(
		@currentUserDecorator() user: IAuthUser, 
		@Body() createServerDto: CreateServerDto, 
		@UploadedFile() server_image: Express.Multer.File) {

		const newServer = await this.serverService.create(createServerDto, user, server_image);

		return newServer;
		
	}

	@Get("images/:filename")
	async getServerImage(
		@Param("filename") filename: string,
		@Res() res: Response
	) {		

		const imageBuffer = await this.serverService.getImage(filename);		

		const ext = path.extname(filename);

		const contentTypeMap = {
			".jpg": "image/jpeg",
			".jpeg": "image/jpeg",
			".png": "image/png",
			".webp": "image/webp",
		};

		res.setHeader(
			"Content-Type",
			contentTypeMap[ext] || "application/octet-stream"
		);

		res.send(imageBuffer);
	}

	@Get()
	findAll(
		@Query("page") page: string,
		@Query("pageSize") pageSize: string,
		@Query("search") search: string
	) {
		return this.serverService.findAll(+page, +pageSize, search);
	}

	@Get("user")
	findUserGroups(@currentUserDecorator() user: IAuthUser) {
		return this.serverService.findUserGroups(user.id);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.serverService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateServerDto: UpdateServerDto) {
		return this.serverService.update(+id, updateServerDto);
	}

	@Delete(':id')
	remove(@currentUserDecorator() user: IAuthUser, @Param('id') id: string) {
		return this.serverService.remove(+id, user);
	}
}
