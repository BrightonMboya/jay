import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";
import { CANT_MUTATE_ERROR } from "../trips/newTrip";
import { invoiceSchema } from "~/components/invoices/newForm/newInvoiceForm";

export const invoices = createTRPCRouter({
  byOrganization: protectedProcedure
    .input(
      z.object({
        organizationEmail: z.string(),
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

        const invoices = await ctx.db.invoices.findMany({
          where: {
            organizationsId: organizationId?.id,
          },

          select: {
            id: true,
            invoiceName: true,
            Date: true,
            clientName: true,
            status: true,
            organizationsId: true,
            invoiceItems: {
              select: {
                amount: true,
              },
            },
          },
        });

        // calculating the total amount for each invoice
        const invoicesWithAmount = invoices.map((invoice) => ({
          ...invoice,
          totalAmount: invoice.invoiceItems.reduce(
            (sum, item) => sum + item.amount,
            0,
          ),
        }));

        return invoicesWithAmount;
      } catch (cause) {
        console.log(cause);
        throw CANT_MUTATE_ERROR;
      }
    }),

  create: protectedProcedure
    .input(
      invoiceSchema.merge(
        z.object({
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

        const newInvoice = await ctx.db.invoices.create({
          data: {
            invoiceName: input.invoiceName,
            tinNumber: input.tinNumber,
            Date: input.date,
            companyAdress: input.companyAdress,
            billingAdress: input.billingAdress,
            clientName: input.clientName,
            bankName: input.bankName,
            bankCustomerName: input.bankCustomerName,
            accNo: input.accNo,
            organizationsId: Number(organizationId?.id),
            invoiceItems: {
              createMany: {
                data: input.invoiceItems,
              },
            },
          },
        });
        return newInvoice;
      } catch (cause) {
        console.log(cause);
        throw CANT_MUTATE_ERROR;
      }
    }),

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
      } catch (cause) {
        console.log(cause);
        throw CANT_MUTATE_ERROR;
      }
    }),
});
