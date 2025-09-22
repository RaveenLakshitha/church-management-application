import { baseProcedure, createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { prisma } from '@/lib/db';
import { TRPCError } from '@trpc/server';
import { memberCreateSchema, memberUpdateSchema } from '../schemas';
import z from 'zod';export const memberRouter = createTRPCRouter({
     // Get all members
  getAll: baseProcedure
    .query(async () => {
      try {
        const members = await prisma.member.findMany();    await new Promise((resolve) => setTimeout(resolve, 3000));
    //throw new TRPCError({code:"BAD_REQUEST"});
    return members;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to fetch all members: ${errorMessage}`);
  }
}),  // Get a member by ID
  getById: baseProcedure
  .input(z.object({ id: z.number().int().positive() }))
  .query(async ({ input }) => {
      const member = await prisma.member.findUnique({
        where: { id: input.id },
      });
      if (!member) {
        throw new Error("Member not found");
      }
      return member;
  }),  // Create a new member
  create: protectedProcedure
    .input(memberCreateSchema)
    .mutation(async ({ input, ctx }) => {
        const {auth} = ctx;
        const member = await prisma.member.create({
          data: {
            ...input,
            profile_photo: input.profile_photo,
          },
        });
        return member;
    }),  
    // Update a member
  update: protectedProcedure
    .input(memberUpdateSchema)
    .mutation(async ({ input }) => {
        const updatedMember = await prisma.member.update({
          where: { id: input.id },
          data: {
            ...input,
          },
        });    
        if(!updatedMember){
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Agent not Found",
      });

    return updatedMember;
    
    }
}),  // // Delete a member
  delete: protectedProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
        const removedMember = await prisma.member.delete({
          where: { id: input.id },
        });    if(!removedMember){
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Agent not Found",
      });
    }

    return removedMember;
}),});

