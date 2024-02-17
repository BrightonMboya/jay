import { Label } from "../ui/label";
import Input from "../ui/Input";
import { UseFormRegister } from "react-hook-form";
import { InvoiceItemValues, type InvoiceSchema } from "./newInvoiceForm";

interface Props {
  idx: number;
  register: UseFormRegister<InvoiceSchema>;
}

export default function InvoiceItemForm({ idx, register }: Props) {
  return (
    <section className="flex items-center space-x-10 pt-10" key={idx}>
      <div>
        <Label>Qty</Label>
        <Input
          placeholder="1"
          {...register(`invoiceItemsSchema.invoiceItems.${idx}.quantity`)}
        />
      </div>

      <div>
        <Label>Description</Label>
        <Input
          placeholder="Travel Booking"
          {...register(`invoiceItemsSchema.invoiceItems.${idx}.desc`)}
        />
      </div>
      <div>
        <Label>Prce</Label>
        <Input
          placeholder="2,500"
          {...register(`invoiceItemsSchema.invoiceItems.${idx}.amount`)}
        />
      </div>
    </section>
  );
}
