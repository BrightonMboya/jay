import React, { useState } from "react";
import Layout from "~/components/Layout/Layout";
import ItienaryHeaderForm from "~/components/itienary/ItienaryHeaderForm";
import DestinationForm from "~/components/itienary/DestinationForm";
import TransportationForm from "~/components/itienary/TransportationForm";
import Button from "~/components/ui/Button";
import SuccessComponent from "~/components/itienary/SuccessComponent";
import { Steps, ConfigProvider } from "antd";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const itienarySchema = z.object({
  guestName: z.string(),
  itienaryName: z.string(),
  numberOfDays: z.string(),
  numberOfNights: z.string(),
  numberOfGuests: z.string(),
  description: z.string(),
  pricePerPerson: z.string(),
  daysManagement: z.array(
    z.object({
      about: z.string(),
      accomodation: z.string(),
    }),
  ),
});

export type ValidationSchema = z.infer<typeof itienarySchema>;

const itienarySteps = [
  {
    id: 1,
    title: "Basic Itienary Info",
  },
  {
    id: 2,
    title: "Destination Details",
  },
  {
    id: 3,
    title: "Transportation Details",
  },
];

const items = itienarySteps.map((item) => ({
  key: item.id,
  title: item.title,
}));

const ItineraryForm = () => {
  const { control, handleSubmit, register, setValue, watch } =
    //^?
    useForm<ValidationSchema>({ resolver: zodResolver(itienarySchema) });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "Day Management",
  });
  const onSubmit = () => {};
  // state for controlling which form is shown on the screen
  const [page, setPage] = useState(0);

  const MultiPageForm = () => {
    switch (page) {
      case 0:
        return <ItienaryHeaderForm control={control} register={register} />;
      case 1:
        return <DestinationForm />;

      // return <DestinationForm />;
      case 2:
        return <TransportationForm />;
      case 3:
        return <SuccessComponent />;
      default:
        return <ItienaryHeaderForm control={control} register={register} />;
    }
  };
  return (
    <Layout>
      <main>
        <ConfigProvider
          theme={{
            components: {
              Steps: {
                colorPrimary: "#dcc6ad",
                navArrowColor: "#764f24",
              },
            },
          }}
        >
          <Steps
            current={page}
            items={items}
            className="fixed w-[60%] bg-white pt-5 font-montserrat"
          />
        </ConfigProvider>
        <form className="pt-10" onSubmit={handleSubmit(onSubmit)}>
          {MultiPageForm()}

          {page < 3 && (
            <div className="space-x-5">
              <Button
                className="mt-10 w-[200px]"
                type="button"
                onClick={() => setPage(page - 1)}
                disabled={page <= 0}
              >
                Previous
              </Button>
              <Button
                className="mt-10 w-[200px]"
                type="button"
                disabled={page >= 3}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </form>
      </main>
    </Layout>
  );
};

export default ItineraryForm;
