import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from './entities/user.entity';
import { UserNotFoundException } from './exceptions/user-not-found.exception';

@Injectable()

export class UserRepository {

    constructor(private readonly prismaService: PrismaService) { }

    async create(createUserDto: CreateUserDto): Promise<User> {

        const { confirm_password, ...newUser } = createUserDto;

        return this.prismaService.user.create({ data: newUser })
    }

    async findAll() {

        let users = await this.prismaService.user.findMany();

        return users.map((u: User) => {

            let { password, ...userNoPassword } = u;

            return userNoPassword;
        })
    }

    async findOne(id: number) {

        let user = await this.prismaService.user.findFirst({
            where: { id }
        });

        if (!user) {
            throw new UserNotFoundException()
        }

        const { password, ...userNoPassword } = user;

        return userNoPassword;
    }

    update(id: number, updateUserDto: UpdateUserDto) {

        return this.prismaService.user.update({
            where: {
                id
            },
            data: updateUserDto
        })
    }

    async remove(id: number): Promise<void> {
        await this.prismaService.user.delete({
            where: { id }
        })
    }

    async findEmail(email: string): Promise<User | null> {

        let user = await this.prismaService.user.findFirst({
            where: { email }
        });

        return user;

    }
}
