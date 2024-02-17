import { ItemLayout, AssetLabel } from "~/pages/contacts/new";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { z } from "zod";
import { Label } from "../ui/label";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InvoiceItemForm from "./InvoiceItemForm";

const invoiceItemsSchema = z.object({
  invoiceItems: z.array(
    z.object({
      desc: z.string(),
      quantity: z.number(),
      amount: z.number(),
    }),
  ),
});

export type InvoiceItemValues = z.infer<typeof invoiceItemsSchema>;

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
  invoiceItemsSchema,
});

const defaultInvoiceItems = {
  desc: "",
  quantity: "",
  amount: 0,
};

export type InvoiceSchema = z.infer<typeof invoiceSchema>;
const {
  register,
  control,
  handleSubmit,
  formState: { errors },
} = useForm<InvoiceSchema>({
  resolver: zodResolver(invoiceSchema),
  defaultValues: {
    // invoiceItemsSchema: [{...,invoiceItems}]
  },
});

const { fields, append } = useFieldArray({
  control,
  name: "invoiceItemsSchema.invoiceItems",
});

const fieldSections = fields.map((field, idx) => {
  const { id } = field;
  return <InvoiceItemForm idx={idx} register={register} />;
});

export default function NewInvoiceForm() {
  return (
    <>
      <section className="relative mt-[50px] flex flex-col space-y-[30px] ">
        <ItemLayout>
          <AssetLabel label="Company Name" />
          <Input placeholder="Ashesi Travel" {...register("companyName")} />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel
            label="TIN"
            caption="Enter the TIN Number of your company"
          />
          <Input
            placeholder="29091238701237123"
            {...register("tinNumber", { valueAsNumber: true })}
            type="number"
          />
        </ItemLayout>
        <ItemLayout>
          <AssetLabel label="Address" caption="Your company Adress" />
          <Input
            placeholder="Arusha, Tanzania"
            {...register("companyAdress")}
          />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel
            label="Billing Address"
            caption="Enter the address of the billing adress"
          />
          <Input placeholder="Munich, Germany" {...register("companyAdress")} />
        </ItemLayout>
        <ItemLayout>
          <AssetLabel
            label="Name"
            caption="Enter the name of the person getting billed"
          />
          <Input placeholder="Kai Bradley" {...register("clientName")} />
        </ItemLayout>
      </section>

      {fieldSections}

      <Button
        className="mt-5 w-[300px] "
        onClick={() => {
          //   append({...defaultInvoiceItems});
        }}
      >
        Add New Item
      </Button>
    </>
  );
}
