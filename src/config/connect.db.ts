import { prisma } from "./prisma.configs";

export const connectDB = async () => {
  try {
    await prisma
      .$connect()
      .then(() => {
        console.log('Database connected');
      })
      .catch((e: any) => {
        console.log(e);
      });
  } catch (error) {
    console.log(error);
  }
};
