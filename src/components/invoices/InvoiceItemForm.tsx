import { Label } from "../ui/label";
import Input from "../ui/Input";
import { UseFormRegister } from "react-hook-form";
import { type InvoiceSchema } from "./newInvoiceForm";

interface Props {
  idx: number;
  register: UseFormRegister<InvoiceSchema>;
}

export default function InvoiceItemForm({ idx, register }: Props) {
  return (
    <section className="flex items-center space-x-10 pt-5" key={idx}>
      <div>
        <Label>Qty</Label>
        <Input
          placeholder="1"
          {...register(`invoiceItems.${idx}.quantity`, { valueAsNumber: true })}
          type="number"
        />
      </div>

      <div>
        <Label>Description</Label>
        <Input
          placeholder="Travel Booking"
          {...register(`invoiceItems.${idx}.desc`)}
        />
      </div>
      <div>
        <Label>Price</Label>
        <Input
          placeholder="2,500"
          {...(register(`invoiceItems.${idx}.amount`), { valueAsNumber: true })}
          type="number"
        />
      </div>
    </section>
  );
}
