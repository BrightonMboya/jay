import { z } from "zod";
import { type Dispatch, type SetStateAction } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import IndividualDayForm from "./IndividualDayForm";
import Button from "~/components/ui/Button";

export const dayManagementSchema = z.object({
  daysManagement: z.array(
    z.object({
      daySummary: z.string().min(1),
      date: z.string(),
      pickUpLocation: z.string().min(1),
      dropOffLocation: z.string().min(1),
      destination: z.string().min(1),
      accomodation: z.string().min(1),
    }),
  ),
});

const defaultArrayObject = {
  daySummary: "",
  date: "",
  pickUpLocation: "",
  dropOffLocation: "",
  destination: "",
  accomodation: "",
};

export type DayManagementValues = z.infer<typeof dayManagementSchema>;

interface DayManagementFormProps {
  onSubmitReady: (values: DayManagementValues) => void;
  initialValues?: DayManagementValues;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function DayManagementForm(props: DayManagementFormProps) {
  const { initialValues, page } = props;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DayManagementValues>({
    resolver: zodResolver(dayManagementSchema),
    defaultValues: {
      daysManagement:
        initialValues && initialValues.daysManagement.length > 0
          ? initialValues.daysManagement
          : [{ ...defaultArrayObject }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "daysManagement",
  });

  // here is where I render the days dynamically, dont get confused, this is not the main return
  const fieldSections = fields.map((field, idx) => {
    const fieldErros = errors.daysManagement?.[idx];
    const { id } = field;

    return (
      <IndividualDayForm
        idx={idx}
        register={register}
        errors={errors}
        key={id}
      />
    );
  });

  return (
    <form onSubmit={handleSubmit(props.onSubmitReady)}>
      {fieldSections}
      <div>
        <Button
          className="mt-10 w-[200px]"
          type="button"
          onClick={() => {
            append({ ...defaultArrayObject });
          }}
        >
          Add Another Day
        </Button>
      </div>

      <Button className="mt-10 w-full" type="submit">
        Save & Next
      </Button>
    </form>
  );
}
