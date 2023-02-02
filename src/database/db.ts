import pkg from "@prisma/client";
import { loadEnvs } from "../config/envs";

loadEnvs();

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

console.log("Connected to Prisma");

export default prisma;
