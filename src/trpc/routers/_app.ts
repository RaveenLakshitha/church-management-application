import { memberRouter } from '@/modules/members/server/procedures';

import { createTRPCRouter } from '../init';

export const appRouter = createTRPCRouter({
  members:memberRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;