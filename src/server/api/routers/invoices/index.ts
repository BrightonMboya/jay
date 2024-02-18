import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";
import { CANT_MUTATE_ERROR } from "../trips/newTrip";
import { invoiceSchema } from "~/components/invoices/newInvoiceForm";

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
        });

        return invoices;
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
});
