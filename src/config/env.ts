export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 5000,
  DATABASE_URL: process.env.DATABASE_URL as string,
  PLT_ADMIN_EMAIL: process.env.PLATFORM_ADMIN_EMAIL as string,
  PLT_ADMIN_PASSWORD: process.env.PLATFORM_ADMIN_PASSWORD as string,
  PLT_ADMIN_PASSWORD_SALT_ROUNDS: Number(
    process.env.PLATFORM_ADMIN_PASSWORD_SALT_ROUNDS
  ),
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
  EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
};
