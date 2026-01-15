import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from './entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Post()
	create(@Body() createUserDto: CreateUserDto): Promise<User | undefined> {
		return this.userService.create(createUserDto);
	}

	@Get()
	findAll(): Promise<User[]> {
		return this.userService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<User> {
		return this.userService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
		return this.userService.update(+id, updateUserDto);
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {

		await this.userService.remove(+id);

		return {
			message: "User removed successfully"
		}
	}
}
