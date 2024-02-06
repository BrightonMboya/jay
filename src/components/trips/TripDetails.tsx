import { AssetLabel, ItemLayout } from "~/pages/contacts/new";
import { api } from "~/utils/api";
import LoadingSkeleton from "./LoadingSkeleton";
import { format } from "date-fns";

interface Props {
  
  tripId: number;
}

export default function TripDetails({ tripId }: Props) {
  const { data, isLoading } = api.trips.byId.useQuery({
    id: tripId,
  });

  return (
    <>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <section className="space-y-5">
          <h3 className="pb-10 text-xl text-primary">{`${data?.guestName} Trip Details`}</h3>
          <ItemLayout>
            <AssetLabel label="Trip Name" />
            <h3>{`${data?.guestName} Trip`}</h3>
          </ItemLayout>

          <ItemLayout>
            <AssetLabel label="Guest Email" />
            <h3>{data?.email}</h3>
          </ItemLayout>

          <ItemLayout>
            <AssetLabel
              label="No of Days"
              caption="The number of days this trip takes"
            />
            <h3>{data?.noOfDays}</h3>
          </ItemLayout>
          <ItemLayout>
            <AssetLabel label="Booked On" caption="When this trip was booked" />
            <h3>{format(data?.bookedOn as unknown as string, "PPP")}</h3>
          </ItemLayout>
          <ItemLayout>
            <AssetLabel label="Arrival" caption="When this guest arrived" />
            <h3>{format(data?.dateOfArrival as unknown as string, "PPP")}</h3>
          </ItemLayout>
          <ItemLayout>
            <AssetLabel
              label="Departure"
              caption="When this guest is leaving"
            />
            <h3>{format(data?.departureDate as unknown as string, "PPP")}</h3>
          </ItemLayout>
        </section>
      )}
    </>
  );
}
