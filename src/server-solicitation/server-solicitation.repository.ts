import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ServerSolicitation } from './entities/server-solicitation.entity';
import { CreateServerSolicitationDto } from './dto/create-server-solicitation.dto';
import ServerSolicitationStatus from 'src/enums/solicitation-status.enum';
import ServerRole from 'src/enums/server-role.enum';
import { ServerSolicitationNotFoundException } from './exceptions/server-solicitation-not-foud.exception';
import { IAuthUser } from 'src/interfaces/authUser.interface';
import { UpdateServerSolicitationDto } from './dto/update-server-solicitation.dto';

@Injectable()

export class ServerSolicitationRepository {

    constructor(private readonly prismaService: PrismaService) { }

    async create(createServerSolicitationDto: CreateServerSolicitationDto): Promise<ServerSolicitation | undefined> {

        return this.prismaService.$transaction(async (prisma) => {

            const newServerSolicitation = await prisma.serverSolicitation.create({
                data: createServerSolicitationDto
            });

            newServerSolicitation.status_id === ServerSolicitationStatus.APPROVED && await prisma.serverUser.create({
                data: {
                    server_id: newServerSolicitation.server_id,
                    user_id: newServerSolicitation.user_id,
                    server_role_id: ServerRole.MEMBER
                }
            });

            return newServerSolicitation;

        });

    }

    async findAll(page: number, pageSize: number, user:IAuthUser) {        

        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const list = await this.prismaService.serverSolicitation.findMany({
            where: { user_id: user.id },
            skip: skip,
            take: take,
            orderBy: {
                created_at: 'desc',
            },
            include: {
                server: {
                    select: {
                        id: true,
                        name: true,
                        server_image: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        profile_picture: true
                    }
                }
            }
        });

        const totalData = await this.prismaService.serverSolicitation.count({
            where: { user_id: user.id },
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

    async findOne(id: number) {

        let server = await this.prismaService.serverSolicitation.findFirst({
            where: { id }
        });

        if (!server) {
            throw new ServerSolicitationNotFoundException()
        }

        return server;
    }

    update(id: number, updateServerSolicitationDto: UpdateServerSolicitationDto) {

        return this.prismaService.$transaction(async (prisma) => {

            const newServerSolicitation = await prisma.serverSolicitation.update({
                where: { id },
                data: updateServerSolicitationDto
            });

            newServerSolicitation.status_id === ServerSolicitationStatus.APPROVED && await prisma.serverUser.create({
                data: {
                    server_id: newServerSolicitation.server_id,
                    user_id: newServerSolicitation.user_id,
                    server_role_id: ServerRole.MEMBER
                }
            });

            return newServerSolicitation;

        });
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
