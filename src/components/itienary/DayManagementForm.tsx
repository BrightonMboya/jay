import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import { ItemLayout, AssetLabel } from "~/pages/contacts/new";
import Input from "../ui/Input";
import { DatePicker } from "../ui/DatePicker";
import { Textarea } from "../ui/TextArea";
import {
  UseFormRegister,
  Control,
  useFieldArray,
  FieldArrayWithId,
  UseFieldArrayAppend,
} from "react-hook-form";

import {
  type ValidationSchema,
  type IDaysManagement,
} from "~/pages/itienaries/new";

const { Dragger } = Upload;

export function ManagementForm({ control, register, remove, index }: any) {
  return (
    <div className="mt-10 space-y-[30px]">
      <h3 className="mb-2 text-xl font-semibold">Destination {index + 1}</h3>
      <ItemLayout>
        <AssetLabel
          label="Name"
          caption="Give this Destination a descriptive Name"
        />
        <Input placeholder="Arusha" {...register("acc")} />
      </ItemLayout>
    </div>
  );
}

interface Props {
  control: UseFormRegister<ValidationSchema>;
  register: Control<ValidationSchema>;
  remove: UseFieldArrayAppend<ValidationSchema>;
  append: any;
  fields: FieldArrayWithId<ValidationSchema>;
}

export default function DayManagementForm({
  control,
  register,
  remove,
  fields,
  append,
}: Props) {
  
  return (
    <section className="pt-10">
      <p className="pb-5 text-4xl text-primary">Trip Destination Details</p>

      {fields.map((item, index) => (
        <ManagementForm
          key={item.id}
          control={control}
          register={register}
          remove={remove}
          index={index}
        />
      ))}

      <button
        type="button"
        onClick={() => append({})}
        className="mb-2 rounded bg-blue-500 p-2 text-white"
      >
        Add Destination
      </button>
    </section>
  );
}
