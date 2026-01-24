import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { ServerRepository } from './server.respository';
import { ServerNotFoundException } from './exceptions/server-not-found.exception';
import { IAuthUser } from 'src/interfaces/authUser.interface';
import { UserNotOwnerException } from './exceptions/user-not-owner.exception';
import { LocalStorageService } from 'src/storage/local-storage';

@Injectable()
export class ServerService {

	constructor(
		private readonly serverRepository: ServerRepository,
		private readonly storageService: LocalStorageService
	) { }

	async create(createServerDto: CreateServerDto, user: IAuthUser, file: Express.Multer.File) {

		let filePath: string | null | undefined = null;

		try {

			if (file) {
				filePath = await this.storageService.saveFile(file, "images");
			}

			const newServer: CreateServerDto = {
				...createServerDto,
				is_public: !!createServerDto.is_public,
				server_image: filePath
			}

			return this.serverRepository.create(newServer, user);

		} catch (err: any) {

			if (filePath) {

				await this.storageService.removeFile(filePath);
			}

			throw new InternalServerErrorException("Internal server error");

		}

	}

	async getImage(imagePath: string) {

		return await this.storageService.getImage(`images/${imagePath}`);
	}

	findAll(page: number, pageSize: number, search: string) {
		return this.serverRepository.findAll(page, pageSize, search);
	}

	findUserGroups(userId: number) {
		return this.serverRepository.findUserGroups(userId);
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
