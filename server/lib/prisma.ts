import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";
import { PrismaClient } from "@prisma/client";

neonConfig.webSocketConstructor = ws;

const connectionString: string | undefined = process.env.DATABASE_URL;

if (!connectionString) {
	throw new Error("DATABASE_URL is not set in environment variables.");
}

declare global {
	var prisma: PrismaClient | undefined;
}

const adapter = new PrismaNeon({ connectionString });

const prisma: PrismaClient = global.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
	global.prisma = prisma;
}

export default prisma;
