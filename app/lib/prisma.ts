import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
}

const adapter = new PrismaMariaDb(dbUrl)
export const prisma = new PrismaClient({ adapter })


if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;