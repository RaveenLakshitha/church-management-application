import { z } from 'zod';

// Define a custom type for JSON values to match Prisma's expectations
const jsonSchema: z.ZodType<any> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
  z.array(z.lazy(() => jsonSchema)),
  z.record(z.string(), z.lazy(() => jsonSchema)),
]).optional().nullable();

// Input validation schema for Member
export const memberCreateSchema = z.object({
  id: z.number().optional(),
  mobile_number: z.string().optional(),
  member_id: z.string(),
  first_name: z.string().optional(),
  middle_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email().optional(),
  gender: z.string().optional(),
  birthday: z.string().datetime().optional(),
  address: z.string().optional(),
  address_line_1: z.string().optional(),
  address_line_2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip_code: z.string().optional(),
  membership_status: z.string().default('active'),
  profile_photo: z.string().optional(),
  member_tags: jsonSchema, // Matches Prisma's JSON expectations
  qr_code: z.string().optional(),
  additional_info: jsonSchema, // Matches Prisma's JSON expectations
});

export const memberUpdateSchema = z.object({
  id: z.number(),
  mobile_number: z.string().optional(),
  member_id: z.string().optional(),
  first_name: z.string().optional(),
  middle_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email().optional(),
  gender: z.string().optional(),
  birthday: z.string().datetime().optional(),
  address: z.string().optional(),
  address_line_1: z.string().optional(),
  address_line_2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip_code: z.string().optional(),
  membership_status: z.string().optional(),
  profile_photo: z.string().optional(),
  member_tags: jsonSchema,
  qr_code: z.string().optional(),
  additional_info: jsonSchema,
});