import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prismaClient: PrismaClient | undefined;
};

export const db = globalForPrisma.prismaClient ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaClient = db;
}

export * from "@prisma/client";
