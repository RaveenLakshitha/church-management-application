// app/trpc/init.ts
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { initTRPC, TRPCError } from '@trpc/server';
import { headers } from 'next/headers';
import { cache } from 'react';
import superjson from 'superjson';

// Define the context type to include Prisma and BetterAuth session
export type Context = {
  prisma: typeof prisma;
  auth?: Awaited<ReturnType<typeof auth.api.getSession>>;
};

export const createTRPCContext = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    prisma,
    auth: session || undefined,
  };
});

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.auth) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'UNAUTHORIZED' });
  }

  return next({ ctx: { ...ctx, auth: ctx.auth } });
});