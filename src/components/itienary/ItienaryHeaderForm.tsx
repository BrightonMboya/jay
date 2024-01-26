import { ItemLayout, AssetLabel } from "~/pages/contacts/new";
import Input from "../ui/Input";
import { Textarea } from "../ui/TextArea";
import { UseFormRegister, Control } from "react-hook-form";
import { type ValidationSchema } from "~/pages/itienaries/new";
interface Props {
  register: UseFormRegister<ValidationSchema>;
  control: Control<ValidationSchema, any>;
}

export default function ItienaryHeaderForm({ register, control }: Props) {
  return (
    <section className="pt-10">
      <p className="text-4xl text-primary ">Basic Itienary Info</p>
      <div className="flex w-full items-center justify-center pt-5">
        <label className=" flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 ">
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
              <span className="font-semibold">
                Upload an Image for this itienary
              </span>
              Maximum 5MB
            </p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" />
        </label>
      </div>
      <div className="mt-10 space-y-[30px]">
        <ItemLayout>
          <AssetLabel
            label="Itienary Name"
            caption="Give this Itienary a desriptive name "
          />
          <Input
            placeholder="Serengeti 2 Days Safaris"
            {...register("itienaryName")}
          />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel
            label="Guest Name"
            caption="The full names of the guest, you can add one name only"
          />
          <Input placeholder="John Legend" {...register("guestName")} />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel
            label="Number of Days"
            caption="How many days will this trip take"
          />
          <Input placeholder="5" {...register("numberOfDays")} />
        </ItemLayout>
        <ItemLayout>
          <AssetLabel
            label="Number of Nights"
            caption="How many moons will this trip take"
          />
          <Input placeholder="4" {...register("numberOfNights")} />
        </ItemLayout>
        <ItemLayout>
          <AssetLabel
            label="Number of Guests"
            caption="How many guests do we have for this trip"
          />
          <Input placeholder="3" {...register("numberOfNights")} />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel
            label="Guests"
            caption="Enter the number of guests in this trip"
          />
          <Input placeholder="300" {...register("numberOfGuests")} />
        </ItemLayout>
        <ItemLayout>
          <AssetLabel
            label="Price"
            caption="Enter the Prcing Per Person for this trip. Default currency is USD"
          />
          <Input placeholder="300" {...register("pricePerPerson")} />
        </ItemLayout>
        <ItemLayout>
          <AssetLabel
            label="Introduction"
            caption="Give this trip a short introduction and hook the guests"
          />
          <Textarea
            placeholder="Add short notes about this Itienary"
            {...register("description")}
          />
        </ItemLayout>
      </div>
    </section>
  );
}
