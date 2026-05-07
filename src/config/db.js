import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// catch missing env var immediately with a clear message
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined. Check your .env file and dotenv setup.');
}

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected via Prisma 7 Adapter");
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await prisma.$disconnect();
  await pool.end();
};

export { prisma, connectDB, disconnectDB };