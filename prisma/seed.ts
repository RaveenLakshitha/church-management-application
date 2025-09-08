// import { PrismaClient, Prisma } from "../src/generated/prisma";

// const prisma = new PrismaClient();

// const memberData: Prisma.MemberCreateInput[] = [
//   {
//     member_id: "M001",
//     first_name: "John",
//     last_name: "Doe",
//     email: "john.doe@example.com",
//     mobile_number: "+1234567890",
//     gender: "male",
//     birthday: new Date("1990-05-15").toISOString(),
//     address: "123 Main St",
//     address_line_1: "Apartment 4B",
//     address_line_2: "",
//     city: "New York",
//     state: "NY",
//     zip_code: "10001",
//     membership_status: "active",
//     profile_photo: "https://example.com/profiles/john.jpg",
//     member_tags: { type: "regular", interests: ["sports", "music"] },
//     qr_code: "QR_M001",
//     additional_info: { emergency_contact: "Jane Doe", notes: "VIP member" },
//   },
//   {
//     member_id: "M002",
//     first_name: "Jane",
//     last_name: "Smith",
//     email: "jane.smith@example.com",
//     mobile_number: "+1987654321",
//     gender: "female",
//     birthday: new Date("1985-08-20").toISOString(),
//     address: "456 Oak Ave",
//     city: "Boston",
//     state: "MA",
//     zip_code: "02108",
//     membership_status: "active",
//     profile_photo: "https://example.com/profiles/jane.jpg",
//     member_tags: { type: "premium", interests: ["art", "travel"] },
//     qr_code: "QR_M002",
//     additional_info: { emergency_contact: "John Smith" },
//   },
// ];

// async function main() {
//   try {
//     for (const m of memberData) {
//       await prisma.member.create({ data: m });
//     }
//     console.log("Members seeded successfully");
//   } catch (error) {
//     console.error("Error seeding members:", error);
//     throw error;
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// main();