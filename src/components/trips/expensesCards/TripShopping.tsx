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
import {
  expensesSchema,
  type ReservationValidationSchema,
} from "./ReservationCard";

export default function TripShoppingCard({
  tripId,
  organizationEmail,
}: TripExpenseProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ReservationValidationSchema>({
    resolver: zodResolver(expensesSchema),
    defaultValues: { rackRateAmount: 0 },
  });

  const { toast } = useToast();
  const utils = api.useUtils();

  const { mutateAsync, isLoading } =
    api.tripAccounting.recordExpense.useMutation({
      onSuccess: () => {
        toast({
          description: "Shopping Expense added succesfully",
        });
        // resetting the form fields
        reset();
        // invalidating the cache for the expense trip
        utils.tripAccounting.fetchExpenseType.invalidate({
          expenseType: "tripShopping",
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
  const onSubmit: SubmitHandler<ReservationValidationSchema> = async (data) => {
    mutateAsync({
      ...data,
      expenseType: "tripShopping",
      organizationEmail: organizationEmail,
      tripId: tripId,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trip Shopping Tracker</CardTitle>
        <CardDescription>
          Record all shopping items related to this trip
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expenseName">Expense Name</Label>
              <Input
                id="expenseName"
                placeholder="Lunch Boxes"
                {...register("expenseName")}
              />
              <p className="text-sm text-red-500">
                {errors?.expenseName?.message}
              </p>
            </div>
            <div>
              <Label htmlFor="expenseName">Date</Label>
              <Input
                id="expenseDate"
                placeholder="Date"
                type="date"
                {...register("date", { valueAsDate: true })}
              />
              <p className="text-sm text-red-500">{errors?.date?.message}</p>
            </div>
          </div>

          <div>
            <Label>Amount</Label>
            <Input
              placeholder="1,800,000"
              type="number"
              {...register("stockRateAmount", { valueAsNumber: true })}
            />
            <p className="text-sm text-red-500">
              {errors?.stockRateAmount?.message}
            </p>
          </div>
          {/* <div>
              <Label>Rack Rate Amount</Label>
              <Input
                placeholder="1,900,000"
                type="number"
                {...register("rackRateAmount", { valueAsNumber: true })}
              />
              <p className="text-sm text-red-500">
                {errors?.rackRateAmount?.message}
              </p>
            </div> */}

          <Label htmlFor="expenseName">Description</Label>
          <Textarea
            placeholder="The lunch boxes were purchased in full"
            {...register("description")}
          />
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
