import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/client'
import { seedUsers } from './user.seed'
import { seedRoles } from './role.seed'
import { seedServerRoles } from './serverRole.seed'

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

const seed = async () => {
    try {
        console.log('🚀 Starting seed process...')
        
        await seedRoles();
        await seedServerRoles();
        await seedUsers();
        console.log('✅ Seed completed successfully!')
        
        await prisma.$disconnect()
        process.exit(0)
    } catch (error) {
        console.error('❌ Error during seeding:', error)
        await prisma.$disconnect()
        process.exit(1)
    }
}

seed()