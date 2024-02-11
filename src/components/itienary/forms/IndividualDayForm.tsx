import { AssetLabel, ItemLayout } from "~/pages/contacts/new";
import Input from "~/components/ui/Input";
import { type UseFormRegister, type FieldErrors, Control } from "react-hook-form";
import { type DayManagementValues } from "./DayManagementForm";
import { Textarea } from "~/components/ui/TextArea";
import SelectDestination from "./SelectDestination";
import SelectAccomodation from "./SelectAccomodation";

interface Props {
  idx: number;
  register: UseFormRegister<DayManagementValues>;
  errors: FieldErrors<DayManagementValues>;
  organizationEmail: string;
  control: Control<DayManagementValues>;
}

export default function IndividualDayForm({
  idx,
  register,
  errors,
  control,
  organizationEmail,
}: Props) {
  return (
    <div className="mt-10 space-y-[30px]">
      <h3 className="mb-2 text-xl font-semibold">Day {idx + 1}</h3>

      <ItemLayout>
        <AssetLabel label="Day" caption="Enter the date of this day" />
        <Input
          placeholder="23/07/2000"
          {...register(`daysManagement.${idx}.date`)}
        />
      </ItemLayout>

      <ItemLayout>
        <AssetLabel
          label="Pick Up Location"
          caption="Where will you pick up the guest"
        />

        <div>
          <Input
            placeholder="Kahawa House"
            {...register(`daysManagement.${idx}.pickUpLocation`)}
          />
        </div>
      </ItemLayout>

      <ItemLayout>
        <AssetLabel
          label="Drop Off Location"
          caption="Where will you drop off this guest"
        />
        <Input
          placeholder="Singita Lodge"
          {...register(`daysManagement.${idx}.dropOffLocation`)}
        />
      </ItemLayout>

      <ItemLayout>
        <AssetLabel
          label="Destination Name"
          caption="What is the destination that this guest will visit this day"
        />
        <SelectDestination
          organizationEmail={organizationEmail}
          control={control}
          idx={idx}
        />
        {/* <Input
          placeholder="Serengeti Plains"
          {...register(`daysManagement.${idx}.destination`)}
        /> */}
      </ItemLayout>

      <ItemLayout>
        <AssetLabel
          label="Accomodation"
          caption="Where will the guest spend the night?"
        />
        <SelectAccomodation
          organizationEmail={organizationEmail}
          control={control}
          idx={idx}
        />
        {/* <Input
          placeholder="Acacia Lodge"
          {...register(`daysManagement.${idx}.accomodation`)}
        /> */}
      </ItemLayout>

      <ItemLayout>
        <AssetLabel
          label="Day Summary"
          caption="What is the summary of the activities that this guest will experience"
        />
        <Textarea
          placeholder="Bird Watching, Wine testing"
          {...register(`daysManagement.${idx}.daySummary`)}
        />
      </ItemLayout>
    </div>
  );
}
