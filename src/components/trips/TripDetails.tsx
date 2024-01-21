import { AssetLabel, ItemLayout } from "~/pages/contacts/new";
export default function TripDetails() {
  return (
    <section className="space-y-5">
      <ItemLayout>
        <AssetLabel label="Trip Name" />
        <h3>James Trip</h3>
      </ItemLayout>

      <ItemLayout>
        <AssetLabel label="Trip Type" />
        <h3>Trekking</h3>
      </ItemLayout>

      <ItemLayout>
        <AssetLabel
          label="No of Days"
          caption="The number of days this trip takes"
        />
        <h3>10</h3>
      </ItemLayout>
      <ItemLayout>
        <AssetLabel label="Booked On" caption="When this trip was booked" />
        <h3>22/01/2023</h3>
      </ItemLayout>
      <ItemLayout>
        <AssetLabel label="Arrival" caption="When this guest arrived" />
        <h3>22/01/2023</h3>
      </ItemLayout>
      <ItemLayout>
        <AssetLabel label="Departure" caption="When this guest is leaving" />
        <h3>22/01/2023</h3>
      </ItemLayout>
    </section>
  );
}
