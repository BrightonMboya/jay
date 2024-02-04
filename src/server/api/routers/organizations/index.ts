import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";

export const organization = createTRPCRouter({
  fetchOrganizationId: protectedProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.organizations.findUnique({
          where: {
            emailAddress: input.email,
          },
          select: {
            id: true,
          },
        });
      } catch (cause) {
        console.log(cause);
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "organization Not found",
        });
      }
    }),
});
