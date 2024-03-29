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
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { supabase } from "~/utils/supabase";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";

export const revenueSchema = z.object({
  amount: z.number(),
  salesType: z.string(),
  salesName: z.string(),
  date: z.date(),
  description: z.string(),
});

export type RevenueValidationSchema = z.infer<typeof revenueSchema>;

export default function TripRevenueCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RevenueValidationSchema>({
    resolver: zodResolver(revenueSchema),
  });
  const [file, setFile] = useState<File | null>(null);
  const user = useUser();

  const { mutateAsync } = api.tripAccounting.recordSales.useMutation();
  const onSubmit: SubmitHandler<RevenueValidationSchema> = async (data) => {
    // uploading the file to supabase
    const fileName = uuidv4();
    const extensionType = file.name.split(".")[1];

    const res = await supabase.storage
      .from("expenses_receipts")
      .upload(`${fileName}.${extensionType}`, file);
    


    // then creating the new record
    mutateAsync({
      amount: data.amount,
      date: data.date,
      description: data.description,
      salesName: data.salesName,
      salesType: data.salesType,
      receiptLink: res?.data?.fullPath,
      organizationEmail: user.user?.primaryEmailAddress
        ?.emailAddress as unknown as string,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target?.files[0]!;

    setFile(selectedFile);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Sales</CardTitle>
        <CardDescription>
          Record all sales you made for this trip
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="salesType">Sales Type</Label>
              <Input
                id="salesType"
                placeholder="trip booking"
                {...register("salesType")}
              />
            </div>
            <div>
              <Label htmlFor="salesName">Sales Name</Label>
              <Input
                id="salesName"
                placeholder="Sales Name"
                {...register("salesName")}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="salesAmount">Amount</Label>
              <Input
                id="salesAmount"
                placeholder="Amount"
                type="number"
                {...register("amount", { valueAsNumber: true })}
              />
            </div>
            <div>
              <Label htmlFor="salesDate">Date</Label>
              <Input
                id="salesDate"
                placeholder="Date"
                type="date"
                {...register("date", { valueAsDate: true })}
              />
            </div>
          </div>

          <Label htmlFor="salesName">Description</Label>
          <Input
            id="salesName"
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
                onChange={handleFileChange}
              />
            </label>
          </div>

          <Button className="w-full" type="submit">
            Submit Sale
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
