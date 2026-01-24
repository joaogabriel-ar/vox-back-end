import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { PrismaService } from 'src/prisma.service';
import { Server } from './entities/server.entity';
import { ServerNotFoundException } from './exceptions/server-not-found.exception';
import { IAuthUser } from 'src/interfaces/authUser.interface';
import ServerRole from 'src/enums/server-role.enum';

@Injectable()

export class ServerRepository {

    constructor(private readonly prismaService: PrismaService) { }

    async create(createServerDto: CreateServerDto, user: IAuthUser): Promise<Server | undefined> {

        return this.prismaService.$transaction(async (prisma) => {

            const newServer = await prisma.server.create({
                data: {
                    ...createServerDto,
                    owner_id: user.id
                }
            });

            await prisma.serverUser.create({
                data: {
                    server_id: newServer.id,
                    user_id: user.id,
                    server_role_id: ServerRole.OWNER
                }
            });

            return newServer;
        });
    }

    async findAll(page: number, pageSize: number, search: string) {        

        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const whereClause = search
            ? { name: { contains: search, mode: 'insensitive' as const } }
            : {};

        const list = await this.prismaService.server.findMany({
            where: whereClause,
            skip: skip,
            take: take,
            orderBy: {
                created_at: 'desc',
            }
        });

        const totalData = await this.prismaService.server.count({
            where: whereClause,
        });

        const totalPages = Math.ceil(totalData / pageSize);

        return {
            list,
            pagination: {
                currentPage: page,
                totalPages,
                pageSize,
                totalData,
            },
        };
    }

    async findUserGroups(userId: number) {

        return await this.prismaService.server.findMany({
            where: {
                users: {
                    some: {
                        user_id: userId
                    }
                }
            }
        });
    }

    async findOne(id: number) {

        let server = await this.prismaService.server.findFirst({
            where: { id }
        });

        if (!server) {
            throw new ServerNotFoundException()
        }

        return server;
    }

    update(id: number, updateServerDto: UpdateServerDto) {

        return this.prismaService.server.update({
            where: {
                id
            },
            data: updateServerDto
        })
    }

    async remove(id: number): Promise<{ message: string }> {

        await this.prismaService.server.delete({
            where: { id }
        })

        return {
            message: "Removed successfully!"
        }
    }

}
