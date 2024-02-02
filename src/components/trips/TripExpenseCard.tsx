import {
  CardContent,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/Card";
import Button from "../ui/Button";
import { Label } from "../ui/label";
import Input from "../ui/Input";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";

export const expensesSchema = z.object({
  amount: z.number(),
  expenseType: z.string(),
  expenseName: z.string(),
  date: z.date(),
  description: z.string(),
  receipt: z.any(),
});

export type ExpenseValidationSchema = z.infer<typeof expensesSchema>;

export default function TripExpenseCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseValidationSchema>({
    resolver: zodResolver(expensesSchema),
  });

  const onSubmit: SubmitHandler<ExpenseValidationSchema> = async (data) => {
    console.log(data.receipt[0], "////");
  };
  console.log(errors, "????");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Expenses</CardTitle>
        <CardDescription>Input the trip expenses details here</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expenseName">Expense Type</Label>
              <Input
                id="expenseName"
                placeholder="Safari"
                {...register("expenseType")}
              />
            </div>
            <div>
              <Label htmlFor="expenseName">Expense Name</Label>
              <Input
                id="expenseName"
                placeholder="Expense Name"
                {...register("expenseName")}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expenseAmount">Amount</Label>
              <Input
                id="expenseAmount"
                placeholder="Amount"
                type="number"
                {...register("amount", { valueAsNumber: true })}
              />
            </div>
            <div>
              <Label htmlFor="expenseDate">Date</Label>
              <Input
                id="expenseDate"
                placeholder="Date"
                type="date"
                {...register("date", { valueAsDate: true })}
              />
            </div>
          </div>

          <Label htmlFor="expenseName">Description</Label>
          <Input
            id="expenseName"
            placeholder="hotel reservation"
            {...register("description")}
          />

          <Label>Receipt</Label>

          <div className="flex w-full items-center justify-center">
            <label className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center ">
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG (MAX 2MB)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                {...register("receipt")}
              />
            </label>
          </div>

          <Button className="w-full" type="submit">
            Submit Expense
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
