import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";
import { CANT_MUTATE_ERROR } from "./newTrip";
import { destinationSchema } from "~/pages/trips/destinations";

export const destinations = createTRPCRouter({
  newDestination: protectedProcedure
    .input(
      destinationSchema.merge(
        z.object({
          imgUrls: z.array(z.string()),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        console.log(input.imgUrls, ">>>>>>>>")
        const newDestination = await ctx.db.destination.create({
          data: {
            ...input,
          },
        });
        return newDestination;
      } catch (cause) {
        console.log(cause);
        throw CANT_MUTATE_ERROR;
      }
    }),
});
