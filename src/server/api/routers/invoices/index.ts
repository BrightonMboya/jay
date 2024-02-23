import { mergeRouters } from "../../trpc";
import { create } from "./create";
import { edit } from "./edit";
import { query } from "./query";
import { bank } from "./bank";

export const invoices = mergeRouters(create, edit, query, bank);
