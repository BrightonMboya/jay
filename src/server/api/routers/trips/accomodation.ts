import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";
import { destinationSchema } from "~/pages/trips/destinations/new";
import { CANT_MUTATE_ERROR } from "./newTrip";

export const accomodation = createTRPCRouter({
  addAccomodation: protectedProcedure
    .input(
      z.object({
        imgUrls: z.array(z.string()),
        organizationEmail: z.string(),
        name: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
         // start by getting the organization Id
        const organizationId = await ctx.db.organizations.findUnique({
          where: {
            emailAddress: input.organizationEmail,
          },
          select: {
            id: true,
          },
        });
        const newAccomodation = await ctx.db.accomodation.create({
          data: {
            name: input.name,
            imgUrls: input.imgUrls,
            description: input.description,
            organizationsId: Number(organizationId?.id),
          },
        });

        return newAccomodation;
      } catch (cause) {
        console.log(cause);
        throw CANT_MUTATE_ERROR;
      }
    }),
});
