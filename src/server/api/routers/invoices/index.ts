import { mergeRouters } from "../../trpc";
import { create } from "./create";
import { edit } from "./edit";
import { query } from "./query";

export const invoices = mergeRouters(create, edit, query);
