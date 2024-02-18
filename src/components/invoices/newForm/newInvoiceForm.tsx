import Button from "../../ui/Button";
import { z } from "zod";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InvoiceItemForm from "./InvoiceItemForm";
import BasicInfoForm from "./BasicInfoForm";
import { inferProcedureInput } from "@trpc/server";
import { AppRouter } from "~/server/api/root";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { ToastAction } from "~/components/ui/Toast";
import { useToast } from "~/utils/hooks/useToast";
import { Spinner } from "../../trips/LoadingSkeleton";
import { useRouter } from "next/router";

export const invoiceSchema = z.object({
  companyName: z.string(),
  invoiceName: z.string(),
  tinNumber: z.string(),
  date: z.date(),
  companyAdress: z.string(),
  billingAdress: z.string(),
  clientName: z.string(),
  bankName: z.string(),
  bankCustomerName: z.string(),
  accNo: z.string(),
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

  const router = useRouter();

  const fieldSections = fields.map((field, idx) => {
    const { id } = field;
    const fieldErrors = errors?.invoiceItems?.[idx];

    return <InvoiceItemForm idx={idx} register={register} key={id} />;
  });

  const user = useUser();
  const organizationEmail = user.user?.primaryEmailAddress
    ?.emailAddress as unknown as string;

  const { toast } = useToast();

  const { mutateAsync, isLoading } = api.invoices.create.useMutation({
    onSuccess: () => {
      toast({
        description: "Invoice Added succesfully",
      });
      router.push("/invoices");
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

  const onSubmit: SubmitHandler<InvoiceSchema> = (data) => {
    type Input = inferProcedureInput<AppRouter["invoices"]["create"]>;
    const input: Input = {
      ...data,
      organizationEmail: organizationEmail,
    };
    try {
      mutateAsync(input);
    } catch (cause) {
      console.log(cause);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pb-10">
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
        {isLoading ? <Spinner /> : " Save Invoice"}
      </Button>
    </form>
  );
}
