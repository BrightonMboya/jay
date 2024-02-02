import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";
import { expensesSchema } from "~/components/trips/TripExpenseCard";
import { CANT_MUTATE_ERROR } from "./newTrip";
import { randomUUID } from "crypto";

export const tripAccounting = createTRPCRouter({
  recordExpense: protectedProcedure
    .input(
      expensesSchema.merge(
        z.object({
          organizationEmail: z.string(),
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

        // then we upload the receipt to supabase
        const fileName = randomUUID();
        const { data } = await ctx.supabase.storage
          .from("expenses_receipts")
          .upload(`${fileName}.png`, input.receipt);
        // record the new expense
        const newExpense = await ctx.db.expenses.create({
          data: {
            amount: input.amount,
            expenseType: input.expenseType,
            expenseName: input.expenseName,
            date: input.date,
            description: input.description,
            receiptLink: data?.path,
            organizationsId: Number(organizationId?.id),
          },
        });
        return newExpense;
      } catch (cause) {
        throw CANT_MUTATE_ERROR;
      }
    }),
});
