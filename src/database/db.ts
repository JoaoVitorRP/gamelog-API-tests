import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

console.log("Connected to Prisma");

export default prisma;
