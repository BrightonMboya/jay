import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import { z } from "zod";
import { CANT_MUTATE_ERROR } from "../trips/newTrip";
import { invoiceSchema } from "~/components/invoices/newForm/newInvoiceForm";
import { TRPCClientError } from "@trpc/client";

export const edit = createTRPCRouter({
  markAsPaid: protectedProcedure
    .input(
      z.object({
        invoiceId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const updatedInvoice = await ctx.db.invoices.update({
          where: {
            id: input.invoiceId,
          },
          data: {
            status: true,
          },
        });
        return updatedInvoice;
      } catch (cause) {
        console.log(cause);
        throw CANT_MUTATE_ERROR;
      }
    }),
});
