import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/client'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export const seedUsers = async () => {

    console.log("🌱 Seeding users...");

    const admin = await prisma.user.upsert({
        where: { email: "admin@admin.com" },
        update: {},
        create: {
            role_id: 1,
            name: "Admin",
            email: "admin@admin.com",
            password: "$2a$10$haJiF4eUABNAk9AXqY3wquWlZjZ/sy/dMoOF/pj6dnKdXjpEag7RW"
        },
    });

    const user1 = await prisma.user.upsert({
        where: { email: "user1@gmail.com" },
        update: {},
        create: {
            role_id: 1,
            name: "User1",
            email: "user1@gmail.com",
            password: "$2a$12$5P6XTQDsHwxqQulHKvmhd./r4zNdGHSUZzYW/ey96MTP.sgfv2d5u"
        },
    });
    const user2 = await prisma.user.upsert({
        where: { email: "user2@gmail.com" },
        update: {},
        create: {
            role_id: 1,
            name: "User2",
            email: "user2@gmail.com",
            password: "$2a$12$5P6XTQDsHwxqQulHKvmhd./r4zNdGHSUZzYW/ey96MTP.sgfv2d5u"
        },
    });

    console.log(`✅ Seeded users`);
};

export type SeededUsers = Awaited<ReturnType<typeof seedUsers>>;