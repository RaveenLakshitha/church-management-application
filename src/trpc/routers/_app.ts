import { memberRouter } from '@/modules/members/server/procedures';

import { createTRPCRouter } from '../init';
import { setupRouter } from '@/modules/setup/server/procedures';

export const appRouter = createTRPCRouter({
  members:memberRouter,
  setup: setupRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;