import { protectedProcedure, createTRPCRouter } from "../../trpc";
import { z } from "zod";
import { basicInfoSchema } from "~/components/itienary/forms/BasicInfo";
import { CANT_MUTATE_ERROR } from "../trips/newTrip";
import { dayManagementSchema } from "~/components/itienary/forms/DayManagementForm";

// basicInfoSchema.merge(
//         z.object({
//           dayManagementSchema,

//           daysManagement: z.array(
//             z.object({
//               daySummary: z.string().min(1),
//               date: z.string(),
//               pickUpLocation: z.string().min(1),
//               dropOffLocation: z.string().min(1),
//               destinationId: z.string().min(1),
//               accomodationId: z.string().min(1),
//             }),
//           ),
//           organizationEmail: z.string(),
//         }),
//       ),

export const itienary = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        guestName: z.string().min(1),
        itienaryName: z.string().min(1),
        numberOfDays: z.string().min(1),
        numberOfNights: z.string().min(1),
        numberOfGuests: z.string().min(1),
        description: z.string(),
        pricePerPerson: z.string().min(1),
        daysManagement: z.array(
          z.object({
            daySummary: z.string().min(1),
            date: z.date(),
            pickUpLocation: z.string().min(1),
            dropOffLocation: z.string().min(1),
            destinationId: z.string().min(1),
            accomodationId: z.string().min(1),
          }),
        ),
        organizationEmail: z.string(),
      }),
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
            itienaryName: input.itienaryName,
            guestName: input.guestName,
            numberOfDays: Number(input.numberOfDays),
            numberOfNights: Number(input.numberOfNights),
            numberOfGuests: Number(input.numberOfGuests),
            description: input.description,
            pricePerPerson: Number(input.pricePerPerson),
            dayManagement: {
              createMany: {
                data: input.daysManagement,
              },
            },
          },
        });
        return newItienary;
      } catch (cause) {
        console.log(cause);
        throw CANT_MUTATE_ERROR;
      }
    }),
});
