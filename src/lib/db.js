import { PrismaClient } from "@prisma/client";

// const globalForPrisma = global;
// globalForPrisma.prisma = undefined;

// const prisma = globalForPrisma.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
// 	globalForPrisma.prisma = prisma;
// }

// module.exports = prisma;

const globalForPrisma = globalThis;

if (!globalForPrisma.prisma) {
	globalForPrisma.prisma = new PrismaClient();
}

const prisma = globalForPrisma.prisma;

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}

export const db = prisma;
