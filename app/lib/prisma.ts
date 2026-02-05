import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const prismaClientSingleton = () => {
    // 1. Create the adapter with the connection string
    const databaseUrl = process.env.DATABASE_URL
    if (!databaseUrl) {
        throw new Error('DATABASE_URL environment variable is not set')
    }
    const adapter = new PrismaMariaDb(databaseUrl)

    // 2. Pass the adapter to the Prisma Client
    return new PrismaClient({ adapter })
}

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma