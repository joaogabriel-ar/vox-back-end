import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { User } from './entities/user.entity';
import { DuplicateEmailException } from './exceptions/duplicate-email.exception';

@Injectable()

export class UserService {

	private salt = 10;

	constructor(private readonly userRepository: UserRepository) { }

	async create(createUserDto: CreateUserDto) {

		const newUser: CreateUserDto = {
			...createUserDto,
			password: await bcrypt.hash(createUserDto.password, this.salt)
		}

		let existingUser = await this.findEmail(createUserDto.email);

		if (existingUser) {
			throw new DuplicateEmailException()
		}

		return this.userRepository.create(newUser);

	}

	findAll() {
		return this.userRepository.findAll();
	}

	findOne(id: number) {
		return this.userRepository.findOne(id);
	}

	async update(id: number, updateUserDto: UpdateUserDto) {

		await this.userExists(id);

		let newUser = { ...updateUserDto, password: await bcrypt.hash(updateUserDto.password, this.salt) }

		return this.userRepository.update(id, newUser)
	}

	async remove(id: number) {

		await this.userExists(id);

		return await this.userRepository.remove(id);
	}

	async findEmail(email: string): Promise<User | null> {

		let user = await this.userRepository.findEmail(email);

		return user;
	}

	async userExists(id: number) {

		let user = await this.findOne(id);

		if(!user) {
			throw new UserNotFoundException();
		}

		return user;
	}
}
