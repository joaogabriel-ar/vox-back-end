import { Injectable } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { ServerRepository } from './server.respository';
import { ServerNotFoundException } from './exceptions/server-not-found.exception';
import { IAuthUser } from 'src/interfaces/authUser.interface';
import { UserNotOwnerException } from './exceptions/user-not-owner.exception';

@Injectable()
export class ServerService {

	constructor(private readonly serverRepository: ServerRepository) { }

	async create(createServerDto: CreateServerDto, user: IAuthUser) {

		return this.serverRepository.create(createServerDto, user);
	}

	findAll() {
		return this.serverRepository.findAll();
	}

	findOne(id: number) {
		return this.serverRepository.findOne(id);
	}

	async update(id: number, updateServerDto: UpdateServerDto) {

		await this.serverExists(id);

		return this.serverRepository.update(id, updateServerDto);
	}

	async remove(id: number, user: IAuthUser) {

		const server = await this.serverExists(id);

		if (server.owner_id !== user.id) throw  new UserNotOwnerException();

		return this.serverRepository.remove(id);
	}

	async serverExists(id: number) {

		const server = await this.findOne(id);

		if (!server) {
			throw new ServerNotFoundException()
		}

		return server;
		
	}

}
