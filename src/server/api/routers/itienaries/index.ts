import { protectedProcedure, createTRPCRouter } from "../../trpc";
import { z } from "zod";
import { basicInfoSchema } from "~/components/itienary/forms/BasicInfo";
import { CANT_MUTATE_ERROR } from "../trips/newTrip";
import { dayManagementSchema } from "~/components/itienary/forms/DayManagementForm";

export const itienary = createTRPCRouter({
  create: protectedProcedure
    .input(
      basicInfoSchema.merge(
        z.object({
          dayManagementSchema,
          organizationEmail: z.string(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const organizationId = await ctx.db.organizations.findUnique({
          where: {
            emailAddress: input.organizationEmail,
          },
          select: {
            id: true,
          },
        });

        // record the basicInfo on the itienary table
        const newItienary = await ctx.db.itienaries.create({
          data: {
            organizationId: Number(organizationId?.id),
            itienaryName: "",
            guestName: input.guestName,
            numberOfDays: Number(input.numberOfDays),
            numberOfNights: Number(input.numberOfNights),
            numberOfGuests: Number(input.numberOfGuests),
            description: input.description,
            pricePerPerson: Number(input.pricePerPerson),
          },
        });

        // record the dayManagement info on its respective table
        const days = input.dayManagementSchema.daysManagement.map((day) => ({
          daySummary: day.daySummary,
          pickUpLocation: day.pickUpLocation,
          dropOffLocation: day.dropOffLocation,
          date: day.date,
          destinationId: day.destinationId,
          accomodationId: day.accomodationId,
          itienaryId: newItienary.id,
        }));

        const itienaryDays = await ctx.db.dayManagement.createMany({
          data: days,
        });
        return itienaryDays;
      } catch (cause) {
        console.log(cause);
        throw CANT_MUTATE_ERROR;
      }
    }),
});
