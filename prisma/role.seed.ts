import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/client'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export const seedRoles = async () => {

    console.log("🌱 Seeding roles...");

    const roles = [
        { name: "Admin" },
        { name: "User" }
    ];

    await Promise.all(
        roles.map((role: any, index: number) =>
            prisma.role.upsert({
                where: { id: index + 1 },
                update: {},
                create: role,
            })
        )
    );

    console.log(`✅ Seeded roles`);
};

export type SeededUsers = Awaited<ReturnType<typeof seedRoles>>;