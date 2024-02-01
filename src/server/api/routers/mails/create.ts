import { z } from "zod";
import { protectedProcedure, createTRPCRouter } from "../../trpc";
import { mailSchema } from "~/pages/mails/new";
import { supabase } from "../../trpc";
import { randomUUID } from "crypto";

export const createMail = createTRPCRouter({
  create: protectedProcedure
    .input(
      mailSchema.merge(
        z.object({
          organizationEmail: z.string(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const mailBlob = new Blob([input.body], { type: "text/plain" });
      try {
        const fileName = randomUUID();
        const { data, error } = await ctx.supabase.storage
          .from("organization_emails")
          .upload(`${fileName}.txt`, input.body);

        // now we fetch the organization id
        const organizationId = await ctx.db.organizations.findUnique({
          where: {
            emailAddress: input.organizationEmail,
          },
          select: {
            id: true,
          },
        });

        // the data above returns a path to the uploaded file, we store that
        const newEmail = await ctx.db.emails.create({
          data: {
            name: input.name,
            label: input.label,
            emailFileLink: data?.path as unknown as string,
            organizationId: organizationId?.id,
          },
        });

        return newEmail;
      } catch (cause) {
        console.log(cause);
      }
    }),
});
