import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { tripSchema } from "~/pages/trips/new";
import { TRPCError } from "@trpc/server";

// change this to a protected procedure

const CANT_MUTATE_ERROR = new TRPCError({
  code: "BAD_REQUEST",
  message: "Failed to perform this operatoin",
});

export const tripsRouter = createTRPCRouter({
  new: publicProcedure.input(tripSchema).mutation(async ({ ctx, input }) => {
    try {
      const newTrip = await ctx.db.trips.create({
        data: input,
      });

      return newTrip;
    } catch (error) {
      console.log(error, "@@@@@@@");
      throw CANT_MUTATE_ERROR;
    }
  }),
});
