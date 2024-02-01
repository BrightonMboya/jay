import NewTripForm from "~/components/trips/NewTripForm";
import Layout from "~/components/Layout/Layout";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { type NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import { api } from "~/utils/api";
import { AppRouter } from "~/server/api/root";
import { inferProcedureInput } from "@trpc/server";
import { useRouter } from "next/router";
import { ToastAction } from "~/components/ui/Toast";
import { useToast } from "~/utils/hooks/useToast";
import { Toaster } from "~/components/ui/toaster";
import LoadingSkeleton from "~/components/trips/LoadingSkeleton";
import { useUser } from "@clerk/nextjs";

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

const Page: NextPageWithLayout = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TripSchemaType>({
    resolver: zodResolver(tripSchema),
  });

  const router = useRouter();
  const { toast } = useToast();
  const user = useUser();

  // handling the data mutation
  const { mutateAsync, isLoading } = api.trips.new.useMutation({
    onSuccess: () => {
      router.push("/trips");
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

  const onSubmit: SubmitHandler<TripSchemaType> = (data) => {
    type Input = inferProcedureInput<AppRouter["trips"]["new"]>;
    const input: Input = {
      ...data,
      organizationEmail: user.user?.primaryEmailAddress
        ?.emailAddress as unknown as string,
    };

    try {
      mutateAsync(input);
    } catch (cause) {
      console.log(cause);
    }
  };

  return (
    <>
      <Toaster />
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <main className="mt-[40px] pl-[30px]">
          <h3 className="text-2xl font-medium ">New Safari</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <NewTripForm register={register} control={control} />
          </form>
        </main>
      )}
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
