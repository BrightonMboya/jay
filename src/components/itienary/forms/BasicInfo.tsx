import { ItemLayout, AssetLabel } from "~/pages/contacts/new";
import Input from "../../ui/Input";
import { Textarea } from "../../ui/TextArea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "~/components/ui/Button";

export const basicInfoSchema = z.object({
  guestName: z.string().min(1),
  itienaryName: z.string().min(1),
  numberOfDays: z.string().min(1),
  numberOfNights: z.string().min(1),
  numberOfGuests: z.string().min(1),
  description: z.string(),
  pricePerPerson: z.string().min(1),
});

export type BasicInfoFormValues = z.infer<typeof basicInfoSchema>;

interface BasicInfoFormProps {
  onSubmitReady: (values: BasicInfoFormValues) => void;
  initialValues?: BasicInfoFormValues;
}

export default function BasicInfoForm(props: BasicInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicInfoFormValues>({
    resolver: zodResolver(basicInfoSchema),
  });
  return (
    <form className="pt-10" onSubmit={handleSubmit(props.onSubmitReady)}>
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
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

          <div>
            <Input
              placeholder="Serengeti 2 Days Safaris"
              {...register("itienaryName")}
            />
            {errors?.itienaryName?.message && (
              <span className="text-sm text-red-500">
                Please give this itienary a name
              </span>
            )}
          </div>
        </ItemLayout>

        <ItemLayout>
          <AssetLabel
            label="Guest Name"
            caption="The full names of the guest, you can add one name only"
          />
          <div>
            <Input placeholder="John Legend" {...register("guestName")} />
            {errors?.guestName?.message && (
              <span className="text-sm text-red-500">
                A guest name is important here ...
              </span>
            )}
          </div>
        </ItemLayout>

        <ItemLayout>
          <AssetLabel
            label="Number of Days"
            caption="How many days will this trip take"
          />
          <div>
            <Input placeholder="5" {...register("numberOfDays")} />
            {errors?.numberOfDays?.message && (
              <span className="text-sm text-red-500">
                The guest would love to know how long this trip will take
              </span>
            )}
          </div>
        </ItemLayout>
        <ItemLayout>
          <AssetLabel
            label="Number of Nights"
            caption="How many moons will this trip take"
          />
          <div>
            <Input placeholder="4" {...register("numberOfNights")} />
            {errors?.numberOfNights?.message && (
              <span className="text-sm text-red-500">
                The guest would love to know how long this trip will take
              </span>
            )}
          </div>
        </ItemLayout>
        <ItemLayout>
          <AssetLabel
            label="Number of Guests"
            caption="How many guests do we have for this trip"
          />
          <div>
            <Input placeholder="3" {...register("numberOfGuests")} />
            {errors?.numberOfGuests?.message && (
              <span className="text-sm text-red-500">
                Adding number of guests is good for record keeping
              </span>
            )}
          </div>
        </ItemLayout>

        <ItemLayout>
          <AssetLabel
            label="Price"
            caption="Enter the Prcing Per Person for this trip. Default currency is USD"
          />
          <div>
            <Input placeholder="300" {...register("pricePerPerson")} />
            {errors?.pricePerPerson?.message && (
              <span className="text-sm text-red-500">
                Adding the price per person is good for accounting
              </span>
            )}
          </div>
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

      <div className="space-x-5">
        <Button className="mt-10 w-[200px]" type="submit">
          Save & Next
        </Button>
      </div>
    </form>
  );
}
