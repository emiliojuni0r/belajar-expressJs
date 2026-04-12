import { PrismaClient } from "../generated/prisma/index.js";
// import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from '@prisma/adapter-neon'

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaNeon({ connectionString })

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    adapter
});

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