import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";

export const fetchTrips = createTRPCRouter({
  tripNames: protectedProcedure
    .input(
      z.object({
        organizationEmail: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const organizationId = await ctx.db.organizations.findUnique({
          where: {
            emailAddress: input.organizationEmail,
          },
          select: {
            id: true,
          },
        });

        const tripNames = await ctx.db.trips.findMany({
          where: {
            organizationsId: organizationId?.id,
          },
          select: {
            guestName: true,
          },
        });
        return tripNames;
      } catch (cause) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Cant found the organization",
        });
      }
    }),
});
