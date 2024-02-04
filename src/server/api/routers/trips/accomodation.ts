import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";
import { destinationSchema } from "~/pages/trips/destinations";
import { CANT_MUTATE_ERROR } from "./newTrip";

export const accomodation = createTRPCRouter({
  addAccomodation: protectedProcedure
    .input(
      destinationSchema.merge(
        z.object({
          imgUrls: z.array(z.string()),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const newAccomodation = await ctx.db.accomodation.create({
          data: {
            ...input,
          },
        });
      } catch (cause) {
        console.log(cause);
        throw CANT_MUTATE_ERROR;
      }
    }),
});
