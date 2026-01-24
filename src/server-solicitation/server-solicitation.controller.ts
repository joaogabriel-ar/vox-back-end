import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ServerSolicitationService } from './server-solicitation.service';
import { CreateServerSolicitationDto } from './dto/create-server-solicitation.dto';
import { UpdateServerSolicitationDto } from './dto/update-server-solicitation.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import currentUserDecorator from 'src/auth/guard/current-user.decorator';
import type { IAuthUser } from 'src/interfaces/authUser.interface';

@UseGuards(JwtAuthGuard)
@Controller('server-solicitation')
export class ServerSolicitationController {
	constructor(private readonly serverSolicitationService: ServerSolicitationService) { }

	@Post()
	create(
		@Body() createServerSolicitationDto: CreateServerSolicitationDto,
	) {
		return this.serverSolicitationService.create(createServerSolicitationDto);
	}

	@Get()
	findAll(
		@Query("page") page: string,
		@Query("pageSize") pageSize: string,
		@currentUserDecorator() user: IAuthUser
	) {
		return this.serverSolicitationService.findAll(+page, +pageSize, user);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.serverSolicitationService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateServerSolicitationDto: UpdateServerSolicitationDto) {
		return this.serverSolicitationService.update(+id, updateServerSolicitationDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.serverSolicitationService.remove(+id);
	}
}
