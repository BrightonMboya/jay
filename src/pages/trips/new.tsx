import NewTripForm from "~/components/trips/NewTripForm";
import Layout from "~/components/Layout/Layout";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const tripSchema = z.object({
  guestName: z.string().min(1),
  email: z.string().min(1),
  itienaryLink: z.string(),
  bookedOn: z.date(),
  dateOfArrival: z.date(),
  departureDate: z.date(),
  citizenship: z.string().min(1),
  noOfDays: z.number(),
  gender: z.string().min(1),
  description: z.string().min(1),
});

export type TripSchemaType = z.infer<typeof tripSchema>;

export default function Page() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TripSchemaType>({
    resolver: zodResolver(tripSchema),
  });

  const createNewTrip: SubmitHandler<TripSchemaType> = (data) => {
    console.log(data);
    console.log(errors, ">>>>>>");
  };

  console.log(errors, ">>>>>>");
  return (
    <Layout>
      <main className="mt-[40px] pl-[30px]">
        <h3 className="text-2xl font-medium ">New Safari</h3>
        <form onSubmit={handleSubmit(createNewTrip)}>
          <NewTripForm register={register} control={control} />
        </form>
      </main>
    </Layout>
  );
}
