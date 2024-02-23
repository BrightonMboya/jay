import { createTRPCRouter, protectedProcedure } from "../../trpc";
import {z} from "zod";

export const bank = createTRPCRouter({
    create: protectedProcedure
    .input()
    .mutation(async ({ctx, input}) => {
        try {
            const newBank = await ctx.db.
        }
    })
})
