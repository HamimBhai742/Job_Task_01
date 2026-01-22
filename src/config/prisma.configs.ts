import { PrismaClient } from '../../generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { ENV } from './env';

if (!ENV.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

const adapter = new PrismaNeon({
  connectionString: ENV.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
export const prisma = new PrismaClient({ adapter });
