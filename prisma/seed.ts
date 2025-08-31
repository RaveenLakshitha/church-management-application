// import { PrismaClient, Prisma } from "../src/generated/prisma";

// const prisma = new PrismaClient();

// const userData: Prisma.UserCreateInput[] = [
//   {
//     name: "Alice",
//     email: "alice@prisma.io",
//     emailVerified: false, // Required field based on your schema
//     createdAt: new Date(), // Required field
//     updatedAt: new Date(), // Required field
//   },
//   {
//     name: "Bob",
//     email: "bob@prisma.io",
//     emailVerified: false, // Required field
//     createdAt: new Date(), // Required field
//     updatedAt: new Date(), // Required field
//   },
// ];

// async function main() {
//   try {
//     for (const u of userData) {
//       await prisma.user.create({ data: u });
//     }
//     console.log("Users seeded successfully");
//   } catch (error) {
//     console.error("Error seeding users:", error);
//     throw error;
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// main();