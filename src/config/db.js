import "dotenv/config";
import { PrismaClient } from "../generated/prisma/index.js";
// import { PrismaClient } from "@prisma/client";
// import { PrismaNeon } from '@prisma/adapter-neon'

import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

// const prisma = new PrismaClient({ adapter });


const connectionString = `${process.env.DATABASE_URL}`
// const adapter = new PrismaNeon({ connectionString })

console.log("adapter", adapter)

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    adapter
});

if (!connectionString) {
    throw new Error("DATABASE_URL is not defined in environment variables");
}

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("DB connected via prisma")
    } catch (error) {
        console.error("DB connection error", error.message)
        process.exit(1)
    }
}

const disconnectDB = async () => {
    await prisma.$diconnect();
}

export { prisma, connectDB, disconnectDB }