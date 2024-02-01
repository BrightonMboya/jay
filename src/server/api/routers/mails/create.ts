import { z } from "zod";
import { protectedProcedure, createTRPCRouter } from "../../trpc";
import { mailSchema } from "~/pages/mails/new";
import { supabase } from "../../trpc";
import { randomUUID } from "crypto";

export const createMail = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        label: z.string(),
        body: z.any(),
        name: z.string(),
      }),
      //   mailSchema.merge(
      //     z.object({
      //       organizationEmail: z.string(),
      //     }),
      //   ),
    )
    .mutation(async ({ ctx, input }) => {
        const mailBlob = new Blob([input.body], { type: "text/plain" });
      try {
        console.log("//////\\\\\\\\");
        const fileName = randomUUID();
        const res = await ctx.supabase.storage
          .from("organization_emails")
          .upload(`${fileName}.txt`, input.body);
        // console.log(error, "?????");
        console.log(res, "$$$$$");

        return res;
      } catch (cause) {
        console.log(cause);
      }
    }),
});
