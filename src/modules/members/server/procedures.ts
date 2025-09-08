import { baseProcedure, createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { prisma } from '@/lib/db';
import { TRPCError } from '@trpc/server';

export const memberRouter = createTRPCRouter({
     // Get all members
  getAll: baseProcedure
    .query(async () => {
      try {
        const members = await prisma.member.findMany();
  
        //await new Promise((resolve) => setTimeout(resolve, 10));
        //throw new TRPCError({code:"BAD_REQUEST"});
        return members;
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Failed to fetch all members: ${errorMessage}`);
      }
    }),
    
  // Get a member by ID
  // getById: baseProcedure
  //   .input(z.object({ id: z.number().int().positive() }))
  //   .query(async ({ input }) => {
  //     try {
  //       const member = await prisma.member.findUnique({
  //         where: { id: input.id },
  //       });
  //       if (!member) {
  //         throw new Error('Member not found');
  //       }
  //       return member;
  //     } catch (error: unknown) {
  //       const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  //       throw new Error(`Failed to fetch member: ${errorMessage}`);
  //     }
  //   }),

  // // Create a new member
  // create: protectedProcedure
  //   .input(memberCreateSchema)
  //   .mutation(async ({ input }) => {
  //     try {
  //       const member = await prisma.member.create({
  //         data: {
  //           ...input,
  //           member_tags: input.member_tags ?? null, // Explicitly handle null
  //           additional_info: input.additional_info ?? null, // Explicitly handle null
  //         },
  //       });
  //       return member;
  //     } catch (error: unknown) {
  //       // Type the error as Error and use a type guard
  //       const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  //       throw new Error(`Failed to create member: ${errorMessage}`);
  //     }
  //   }),

  // // Update a member
  // update: baseProcedure
  //   .input(
  //     z.object({
  //       id: z.number().int().positive(),
  //       data: memberCreateSchema.partial(),
  //     })
  //   )
  //   .mutation(async ({ input }) => {
  //     try {
  //       const member = await prisma.member.update({
  //         where: { id: input.id },
  //         data: {
  //           ...input.data,
  //           member_tags: input.data.member_tags ?? null, // Explicitly handle null
  //           additional_info: input.data.additional_info ?? null, // Explicitly handle null
  //         },
  //       });
  //       return member;
  //     } catch (error: unknown) {
  //       const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  //       throw new Error(`Failed to update member: ${errorMessage}`);
  //     }
  //   }),

  // // Delete a member
  // delete: baseProcedure
  //   .input(z.object({ id: z.number().int().positive() }))
  //   .mutation(async ({ input }) => {
  //     try {
  //       await prisma.member.delete({
  //         where: { id: input.id },
  //       });
  //       return { success: true };
  //     } catch (error: unknown) {
  //       const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  //       throw new Error(`Failed to delete member: ${errorMessage}`);
  //     }
  //   }),
});