import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { tripSchema } from "~/pages/trips/new";
import { TRPCError } from "@trpc/server";

// change this to a protected procedure

export const CANT_MUTATE_ERROR = new TRPCError({
  code: "BAD_REQUEST",
  message: "Failed to perform this operatoin",
});

export const tripsRouter = createTRPCRouter({
  new: protectedProcedure
    .input(
      tripSchema.merge(
        z.object({
          organizationEmail: z.string(),
        }),
      ),
    )

    .mutation(async ({ ctx, input }) => {
      try {
        // fetching the unique organization email
        const organizationId = await ctx.db.organizations.findUnique({
          where: {
            emailAddress: input.organizationEmail,
          },
          select: {
            id: true,
          },
        });
        const newTrip = await ctx.db.trips.create({
          data: {
            guestName: input.guestName,
            email: input.email,
            itienaryLink: input.itienaryLink,
            bookedOn: input.bookedOn,
            departureDate: input.departureDate,
            dateOfArrival: input.dateOfArrival,
            citizenship: input.citizenship,
            description: input.description,
            noOfDays: input.noOfDays,
            gender: input.gender,
            organizationsId: organizationId?.id,
          },
        });

        return newTrip;
      } catch (error) {
        console.log(error);
        throw CANT_MUTATE_ERROR;
      }
    }),

  byOrganization: protectedProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        // lets find the organizationId associated with this email
        const organizationId = await ctx.db.organizations.findUnique({
          where: {
            emailAddress: input.email,
          },
          select: {
            id: true,
          },
        });

        // then we fetch all the trips associated with this id
        const trips = await ctx.db.trips.findMany({
          where: {
            organizationsId: organizationId?.id as unknown as number,
          },
        });

        return trips;
      } catch (cause) {
        console.log(cause);
        throw CANT_MUTATE_ERROR;
      }
    }),
});
