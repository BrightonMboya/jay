import Button from "../ui/Button";
import { z } from "zod";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InvoiceItemForm from "./InvoiceItemForm";
import BasicInfoForm from "./BasicInfoForm";
import { inferProcedureInput } from "@trpc/server";
import { AppRouter } from "~/server/api/root";

export const invoiceSchema = z.object({
  companyName: z.string(),
  invoiceName: z.string(),
  tinNumber: z.number(),
  date: z.date(),
  companyAdress: z.string(),
  clientName: z.string(),
  bankName: z.string(),
  bankCustomerName: z.string(),
  accNo: z.number(),
  invoiceItems: z.array(
    z.object({
      desc: z.string(),
      quantity: z.number(),
      amount: z.number(),
    }),
  ),
});

const defaultInvoiceItems = [
  {
    desc: "",
    quantity: 0,
    amount: 0,
  },
];

export type InvoiceSchema = z.infer<typeof invoiceSchema>;

export default function NewInvoiceForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceSchema>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      invoiceItems: [...defaultInvoiceItems],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "invoiceItems",
  });

  const fieldSections = fields.map((field, idx) => {
    const { id } = field;
    const fieldErrors = errors?.invoiceItems?.[idx];

    return <InvoiceItemForm idx={idx} register={register} key={id} />;
  });

  const onSubmit: SubmitHandler<InvoiceSchema> = (data) => {
    try {
      console.log(data);
    } catch (cause) {
      console.log(cause);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <BasicInfoForm register={register} />
      <h3 className="text-prmary pt-10 text-xl font-medium">Invoice Items</h3>
      {fieldSections}

      <Button
        className="mt-5 w-[300px] "
        onClick={() => {
          append({
            desc: "",
            quantity: 0,
            amount: 0,
          });
        }}
        type="button"
      >
        Add New Item
      </Button>

      <Button className="mt-10" type="submit">
        Save Invoice
      </Button>
    </form>
  );
}
