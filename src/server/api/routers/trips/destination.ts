import { createTRPCRouter, protectedProcedure } from "../../trpc";
import {z} from "zod";
import { CANT_MUTATE_ERROR } from "./newTrip";

export const destinations = createTRPCRouter({
    newDestination: protectedProcedure
    .input()
    .mutation(async ({ctx, input}) => {
        try {}
        catch(cause){
            console.log(cause)
            throw CANT_MUTATE_ERROR
        }
    })
})