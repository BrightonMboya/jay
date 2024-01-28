import Layout from "~/components/Layout/Layout";
import { useRouter } from "next/router";
import { data } from "~/components/trips/TripsList";
import TripDetails from "~/components/trips/TripDetails";
import { Separator } from "~/components/ui/seperator";
import { TooltipProvider } from "~/components/ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import { ExpenseTable } from "~/components/trips/ExpensesTable";
import TripAccounting from "~/components/trips/TripAccounting"

export default function Page() {
  const { query } = useRouter();
  const tripId = query.tripId;
  const trip = data.filter((trip) => trip.id === Number(tripId));
  const defaultLayout = [500, 400, 655];

  return (
    <Layout>
      <main className="mt-[40px] pl-[30px]">
        <h3 className="pb-10 text-xl text-primary">{`${trip[0]?.guestName} Trip Expense`}</h3>
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
              <Separator />
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
    </Layout>
  );
}
