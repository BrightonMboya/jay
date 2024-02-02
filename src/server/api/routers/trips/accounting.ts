import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";
import { expensesSchema } from "~/components/trips/TripExpenseCard";
import { CANT_MUTATE_ERROR } from "./newTrip";
import { revenueSchema } from "~/components/trips/RevenueCard";

export const tripAccounting = createTRPCRouter({
  recordExpense: protectedProcedure
    .input(
      expensesSchema.merge(
        z.object({
          organizationEmail: z.string(),
          receiptLink: z.string(),
        }),
      ),
      // z.object({
      //   organizationEmail: z.string(),
      //   amount: z.number(),
      //   expenseType: z.string(),
      //   expenseName: z.string(),
      //   date: z.date(),
      //   description: z.string(),
      //   receiptLink: z.any(),
      // }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // look for that organization id
        const organizationId = await ctx.db.organizations.findUnique({
          where: {
            emailAddress: input.organizationEmail,
          },
          select: {
            id: true,
          },
        });

        // record the new expense
        const newExpense = await ctx.db.expenses.create({
          data: {
           
            amount: input.amount,
            expenseType: input.expenseType,
            expenseName: input.expenseName,
            date: input.date,
            description: input.description,
            receiptLink: input.receiptLink,
            organizationsId: Number(organizationId?.id),
          },
        });
        return newExpense;
      } catch (cause) {
        throw CANT_MUTATE_ERROR;
      }
    }),

  recordSales: protectedProcedure
    .input(
      revenueSchema.merge(
        z.object({
          organizationEmail: z.string(),
          receiptLink: z.string(),
        }),
      ),
      // z.object({
      //   organizationEmail: z.string(),
      //   amount: z.number(),
      //   salesType: z.string(),
      //   salesName: z.string(),
      //   date: z.date(),
      //   description: z.string(),
      //   receiptLink: z.any(),
      // }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // look for that organization id
        const organizationId = await ctx.db.organizations.findUnique({
          where: {
            emailAddress: input.organizationEmail,
          },
          select: {
            id: true,
          },
        });

        //   record the new sales
        const newSale = await ctx.db.sales.create({
          data: {
            amount: input.amount,
            salesType: input.salesType,
            salesName: input.salesName,
            date: input.date,
            description: input.description,
            organizationsId: organizationId?.id,
          },
        });
        return newSale;
      } catch (cause) {
        console.log(cause);
        throw CANT_MUTATE_ERROR;
      }
    }),
});
