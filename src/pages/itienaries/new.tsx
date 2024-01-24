import React, { useState } from "react";
import Layout from "~/components/Layout/Layout";
import ItienaryHeaderForm from "~/components/itienary/ItienaryHeaderForm";
import DestinationForm from "~/components/itienary/DestinationForm";
import TransportationForm from "~/components/itienary/TransportationForm";
import Button from "~/components/ui/Button";
import SuccessComponent from "~/components/itienary/SuccessComponent";
import { message, Steps, theme, ConfigProvider } from "antd";

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
  // state for controlling which form is shown on the screen
  const [page, setPage] = useState(0);

  const MultiPageForm = () => {
    switch (page) {
      case 0:
        return <ItienaryHeaderForm />;
      case 1:
        return <DestinationForm />;
      case 2:
        return <TransportationForm />;
      case 3:
        return <SuccessComponent />;
      default:
        return <ItienaryHeaderForm />;
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
        <form className="pt-10">
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
