import React, { useState } from "react";
import Layout from "~/components/Layout/Layout";
import ItienaryHeaderForm from "~/components/itienary/ItienaryHeaderForm";
import DestinationForm from "~/components/itienary/DestinationForm";
import TransportationForm from "~/components/itienary/TransportationForm";
import Button from "~/components/ui/Button";

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
      default:
        return <ItienaryHeaderForm />;
    }
  };
  return (
    <Layout>
      <main>
        <form>
          {MultiPageForm()}
          <div>
            <Button
              className="mt-10 w-[200px]"
              type="button"
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </form>
      </main>
    </Layout>
  );
};

export default ItineraryForm;
