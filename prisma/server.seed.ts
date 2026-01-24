import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "./generated/client"

export const seedServers = async () => {
    const connectionString = `${process.env.DATABASE_URL}`

    const adapter = new PrismaPg({ connectionString })
    const prisma = new PrismaClient({ adapter })

    console.log("🌱 Seeding servers...")

    const users = await prisma.user.findMany()

    const ownerRole = await prisma.serverRole.findFirst({
        where: { id: 1 }
    })

    if (!ownerRole) {
        throw new Error("OWNER role not found.")
    }

    for (const user of users) {
        for (let i = 1; i <= 10; i++) {
            await prisma.server.create({
                data: {
                    server_image: "https://picsum.photos/200/300",
                    name: `${user.name}'s Server ${i}`,
                    is_public: true,
                    owner_id: user.id,
                    users: {
                        create: {
                            user_id: user.id,
                            server_role_id: ownerRole.id,
                        }
                    }
                }
            })
        }
    }

    console.log("✅ Seeded 10 servers per user")
}
