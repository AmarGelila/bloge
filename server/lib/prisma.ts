import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({
	connectionString,
	max: 1,
	connectionTimeoutMillis: 5000,
	idleTimeoutMillis: 30000,
});
const adapter = new PrismaPg(pool);

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV === "dev") {
	globalForPrisma.prisma = prisma;
}

export default prisma;
