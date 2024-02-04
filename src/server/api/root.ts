import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { tripsRouter } from "./routers/trips/newTrip";
import { createMail } from "./routers/mails/create";
import { tripAccounting } from "./routers/trips/accounting";
import { fetchTrips } from "./routers/trips/fetch";
import { destinations } from "./routers/trips/destination";
import { accomodation } from "./routers/trips/accomodation";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  trips: tripsRouter,
  createMail,
  tripAccounting,
  fetchTrips,
  destinations,
  accomodation,
});

// export type definition of API
export type AppRouter = typeof appRouter;
