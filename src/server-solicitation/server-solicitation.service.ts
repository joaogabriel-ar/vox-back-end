import { Injectable } from '@nestjs/common';
import { CreateServerSolicitationDto } from './dto/create-server-solicitation.dto';
import { UpdateServerSolicitationDto } from './dto/update-server-solicitation.dto';
import { UserService } from 'src/user/user.service';
import { ServerService } from 'src/server/server.service';
import { ServerSolicitationRepository } from './server-solicitation.repository';
import { Server } from 'src/server/entities/server.entity';
import { UserAlreadyInGroup } from './exceptions/user-already-in-group.exception';
import { IAuthUser } from 'src/interfaces/authUser.interface';
import { ServerSolicitation } from './entities/server-solicitation.entity';

@Injectable()

export class ServerSolicitationService {

	constructor(
		private readonly userService: UserService,
		private readonly serverService: ServerService,
		private readonly serverSolicitationRepository: ServerSolicitationRepository 
	) { }

	async create(createServerSolicitationDto: CreateServerSolicitationDto) {

		await this.serverService.findOne(createServerSolicitationDto.server_id);
		await this.userService.findOne(createServerSolicitationDto.user_id);

		await this.validateUserInSolicitation(createServerSolicitationDto)
		return this.serverSolicitationRepository.create(createServerSolicitationDto);
	}

	findAll(page: number, pageSize: number, user: IAuthUser) {
		return this.serverSolicitationRepository.findAll(page, pageSize, user);
	}

	async findOne(id: number) {
		return await this.serverSolicitationRepository.findOne(id);
	}

	async update(id: number, updateServerSolicitationDto: UpdateServerSolicitationDto) {

		const serverSolicitation = await this.findOne(id);
		
		await this.validateUserInSolicitation(serverSolicitation);
 
		return this.serverSolicitationRepository.update(id, updateServerSolicitationDto);
	}

	remove(id: number) {
		return this.serverSolicitationRepository.remove(id);
	}

	private async validateUserInSolicitation(serverSolicitaion: ServerSolicitation) {
		
		const userGroups = await this.serverService.findUserGroups(serverSolicitaion.user_id);

		if (userGroups.some(({ id }: Server) => id === serverSolicitaion.server_id)) {
			throw new UserAlreadyInGroup();
		}

	}
}
