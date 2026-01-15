import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/client'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export const seedUsers = async () => {

    console.log("🌱 Seeding users...");

    const admin = await prisma.user.upsert({
        where: { email: "alice@prisma.io" },
        update: {},
        create: {
            name: "Admin",
            email: "admin@admin.com",
            password: "$2a$10$haJiF4eUABNAk9AXqY3wquWlZjZ/sy/dMoOF/pj6dnKdXjpEag7RW"
        },
    });

    console.log(`✅ Seeded ${[admin].length} users`);
    return { admin };
};

export type SeededUsers = Awaited<ReturnType<typeof seedUsers>>;