import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/client'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export const seedServerRoles = async () => {

    console.log("🌱 Seeding server roles...");

    const serverRoles = [
        { name: "Owner" },
        { name: "Member" }
    ];

    await Promise.all(
        serverRoles.map((serverRole: any, index: number) =>
            prisma.serverRole.upsert({
                where: { id: index + 1 },
                update: {},
                create: serverRole,
            })
        )
    );

    console.log(`✅ Seeded server roles`);
};

export type SeededUsers = Awaited<ReturnType<typeof seedServerRoles>>;