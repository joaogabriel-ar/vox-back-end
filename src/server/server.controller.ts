import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ServerService } from './server.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import currentUserDecorator from 'src/auth/guard/current-user.decorator';
import type { IAuthUser } from 'src/interfaces/authUser.interface';

@UseGuards(JwtAuthGuard)
@Controller('servers')
export class ServerController {
	constructor(private readonly serverService: ServerService) { }

	@Post()
	create(@currentUserDecorator() user: IAuthUser, @Body() createServerDto: CreateServerDto) {

		return this.serverService.create(createServerDto, user);
	}

	@Get()
	findAll() {
		return this.serverService.findAll();
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
