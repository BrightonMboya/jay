import Layout from "~/components/Layout/Layout";
import { useRouter } from "next/router";
import TripDetails from "~/components/trips/TripDetails";
import { Separator } from "~/components/ui/seperator";
import { TooltipProvider } from "~/components/ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import { ExpenseTable } from "~/components/trips/ExpensesTable";
import TripAccounting from "~/components/trips/TripAccounting";
import { api } from "~/utils/api";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import LoadingSkeleton from "~/components/trips/LoadingSkeleton";

const Page: NextPageWithLayout = () => {
  const { query } = useRouter();
  const tripId = query.tripId;
  // const { data, isLoading } = api.trips.byId.useQuery({
  //   id: Number(tripId)
  // });

  // const trip = data;
  const defaultLayout = [500, 400, 655];


  return (
    <>
      {/* {isLoading ? (
        <LoadingSkeleton />
      ) : ( */}
        <main className="mt-[40px] pl-[30px]">
          {/* <h3 className="pb-10 text-xl text-primary">{`${trip?.guestName} Trip Expense`}</h3> */}
          <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
              direction="horizontal"
              onLayout={(sizes: number[]) => {
                document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                  sizes,
                )}`;
              }}
              className="h-full max-h-[800px] items-stretch "
            >
              <ResizablePanel
                defaultSize={defaultLayout[2]}
                collapsedSize={4}
                collapsible={true}
                minSize={30}
              >
                <TripDetails />
                <Separator className="mt-5" />
                <ExpenseTable />
              </ResizablePanel>
              <ResizableHandle withHandle />

              <ResizablePanel
                defaultSize={600}
                collapsedSize={4}
                collapsible={true}
                minSize={30}
                className="pl-10"
              >
                <TripAccounting />
              </ResizablePanel>
            </ResizablePanelGroup>
          </TooltipProvider>
        </main>
      {/* )} */}
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
