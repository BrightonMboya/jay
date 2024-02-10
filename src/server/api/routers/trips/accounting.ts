import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";
import { CANT_MUTATE_ERROR } from "./newTrip";
import { revenueSchema } from "~/components/trips/RevenueCard";
import { expensesSchema } from "~/components/trips/expensesCards/ReservationCard";
import { TRPCError } from "@trpc/server";

export const tripAccounting = createTRPCRouter({
  recordExpense: protectedProcedure
    .input(
      expensesSchema.merge(
        z.object({
          organizationEmail: z.string(),
          expenseType: z.string(),
          tripId: z.number(),
        }),
      ),
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
            rackRateAmount: input.rackRateAmount,
            stockRateAmount: input.stockRateAmount,
            expenseType: input.expenseType,
            expenseName: input.expenseName,
            date: input.date,
            paid: input.paidByAccountant,
            description: input.description,
            organizationsId: Number(organizationId?.id),
            tripsId: input.tripId,
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
            receiptLink: input.receiptLink,
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

  fetchExpenseType: protectedProcedure
    .input(
      z.object({
        organizationEmail: z.string(),
        expenseType: z.string(),
        tripId: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      try {
        const organizationId = await ctx.db.organizations.findUnique({
          where: {
            emailAddress: input.organizationEmail,
          },
          select: {
            id: true,
          },
        });

        const expenses = await ctx.db.expenses.findMany({
          where: {
            organizationsId: organizationId?.id,
            expenseType: input.expenseType === "all" ? "" : input.expenseType,
            tripsId: input.tripId,
          },
        });

        return expenses;
      } catch (cause) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The expenses could not be fetched",
        });
      }
    }),
});
