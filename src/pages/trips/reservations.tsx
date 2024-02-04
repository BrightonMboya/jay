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
import ReservationCard from "~/components/trips/ReservationCard";
import { api } from "~/utils/api";

export default function Page() {
  const { query } = useRouter();
  const tripId = query.tripId;

  const defaultLayout = [500, 400, 655];

  return (
    <Layout>
      <main className="mt-[40px] pl-[30px]">
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
              <TripDetails organizationId={0} tripId={Number(tripId)} />
              <Separator className="mt-5" />
              {/* <ExpenseTable /> */}
            </ResizablePanel>
            <ResizableHandle withHandle />

            <ResizablePanel
              defaultSize={600}
              collapsedSize={4}
              collapsible={true}
              minSize={30}
              className="pl-10"
            >
              <ReservationCard />
            </ResizablePanel>
          </ResizablePanelGroup>
        </TooltipProvider>
      </main>
    </Layout>
  );
}
