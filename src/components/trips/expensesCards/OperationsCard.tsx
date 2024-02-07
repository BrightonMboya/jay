import {
  CardContent,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../ui/Card";
import Button from "../../ui/Button";
import { Label } from "../../ui/label";
import Input from "../../ui/Input";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../../ui/TextArea";
import { api } from "~/utils/api";
import { useToast } from "~/utils/hooks/useToast";
import { ToastAction } from "~/components/ui/Toast";
import { Spinner } from "../LoadingSkeleton";
import { TripExpenseProps } from "../ExpensesTable";

export const operationsSchema = z.object({
  expenseName: z.string(),
  amount: z.number(),
  date: z.date(),
  description: z.string(),
  paidByAccountant: z.boolean(),
});
export type OperationsValidationSchema = z.infer<typeof operationsSchema>;

export default function ReservationCard({
  tripId,
  organizationEmail,
}: TripExpenseProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<OperationsValidationSchema>({
    resolver: zodResolver(operationsSchema),
    // defaultValues: { paidByAccountant: false },
  });

  const { toast } = useToast();
  const utils = api.useUtils();

  const { mutateAsync, isLoading } =
    api.tripAccounting.recordExpense.useMutation({
      onSuccess: () => {
        toast({
          description: "Reservation Expense added succesfully",
        });
        // resetting the form fields
        reset();
        // invalidating the cache for the expense trip
        utils.tripAccounting.fetchExpenseType.invalidate({
          expenseType: "reservations",
        });
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `${error.message}`,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
          duration: 1500,
        });
      },
    });
  const onSubmit: SubmitHandler<OperationsValidationSchema> = async (data) => {
    mutateAsync({
      ...data,
      expenseType: "reservations",
      organizationEmail: organizationEmail,
      tripId: tripId,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reservation Tracker</CardTitle>
        <CardDescription>
          Record Reservations related expenses here
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expenseName">Accomodation Name</Label>
              <Input
                id="expenseName"
                placeholder="Grand Melia Hotel"
                {...register("expenseName")}
              />
              <p className="text-sm text-red-500">
                {errors?.expenseName?.message}
              </p>
            </div>
            <div>
              <Label htmlFor="expenseName">Date Booked</Label>
              <Input
                id="expenseDate"
                placeholder="Date"
                type="date"
                {...register("date", { valueAsDate: true })}
              />
              <p className="text-sm text-red-500">{errors?.date?.message}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Stock Rate Amount</Label>
              <Input
                placeholder="1,800,000"
                type="number"
                {...register("amount", { valueAsNumber: true })}
              />
              <p className="text-sm text-red-500">
                {errors?.amount?.message}
              </p>
            </div>
          </div>

          <Label htmlFor="expenseName">Description</Label>
          <Textarea placeholder="Double room" {...register("description")} />
          <p className="text-sm text-red-500">{errors?.description?.message}</p>

          <div className="flex items-center space-x-2">
            <input type="checkbox" {...register("paidByAccountant")} />

            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Already Paid by Accountant?
            </label>
          </div>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner /> : <p> Submit Expense</p>}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
