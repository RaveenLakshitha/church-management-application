import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import {  createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { Role } from '@/generated/prisma';
import { uploadFile } from '@/lib/file-upload';

export const setupRouter = createTRPCRouter({
  createChurchProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, 'Church name is required'),
        churchLogo: z.any(),
        companyEmail: z.string().email('Invalid email address').min(1, 'Email is required'),
        companyPhone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number').min(1, 'Phone number is required'),
        whitelabel: z.boolean().default(true),
        address: z.string().min(1, 'Address is required'),
        city: z.string().min(1, 'City is required'),
        zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code').min(1, 'ZIP code is required'),
        state: z.string().min(1, 'State is required'),
        country: z.string().min(1, 'Country is required'),
        goal: z.number().int().min(1, 'Goal must be a positive integer'),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!input.churchLogo?.[0]) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Church logo is required',
        });
      }

      let logoPath: string;
      try {
        logoPath = await uploadFile(input.churchLogo[0], 'church-logos');
      } catch (error) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Failed to upload church logo. Please try again.',
        });
      }

      const church = await ctx.prisma.church.create({
        data: {
          name: input.name,
          churchLogo: logoPath,
          companyEmail: input.companyEmail,
          companyPhone: input.companyPhone,
          whitelabel: input.whitelabel,
          address: input.address,
          city: input.city,
          zipCode: input.zipCode,
          state: input.state,
          country: input.country,
          goal: input.goal,
          users: {
            connect: { email: ctx.user.email },
          },
        },
      });

      // Link church to user
      await ctx.prisma.user.update({
        where: { email: ctx.user.email },
        data: { churchId: church.id },
      });

      return { church };
    }),

    updateUserProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email address').min(1, 'Email is required'),
        image: z.any().optional(),
        role: z.enum([Role.SUBACCOUNT_USER, Role.CHURCH_OWNER]).default(Role.SUBACCOUNT_USER),
        missionStatement: z.string().min(1, 'Mission statement is required'),
      })
    )
    .mutation(async ({ ctx, input }) => {
      let imagePath: string | undefined;

      if (input.image?.[0]) {
        try {
          imagePath = await uploadFile(input.image[0], 'user-images');
        } catch (error) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Failed to upload image. Please try again.',
          });
        }
      }

      const user = await ctx.auth.user.upsert({
        where: { email: ctx.auth.user.email }, // Use authenticated user's email
        update: {
          name: input.name,
          image: imagePath,
          role: input.role,
          missionStatement: input.missionStatement,
        },
        create: {
          id: ctx.user.id,
          email: input.email,
          name: input.name,
          image: imagePath,
          role: input.role,
          missionStatement: input.missionStatement,
        },
      });

      return { user };
    }),
});