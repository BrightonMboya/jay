import { ItemLayout, AssetLabel } from "~/pages/contacts/new";
import Input from "../ui/Input";
import { DatePicker } from "../ui/DatePicker";

export default function TransportationForm() {
  return (
    <section className="pt-10">
      <p className="pb-5 text-4xl text-primary">Transportation Details</p>
      <div className="mt-10 space-y-[30px]">
        <ItemLayout>
          <AssetLabel
            label="Date"
            caption="When will this transportation Happen"
          />
          <DatePicker />
        </ItemLayout>
        <ItemLayout>
          <AssetLabel
            label="Company"
            caption="Which Company will be responsible for this transportation"
          />
          <Input placeholder="Tazama" />
        </ItemLayout>
        <ItemLayout>
          <AssetLabel
            label="type"
            caption="What is the type of this transportation"
          />
          <Input placeholder="Airport Transfer" />
        </ItemLayout>
        <ItemLayout>
          <AssetLabel
            label="Pickup"
            caption="What is the pickup Location of this transfer"
          />
          <Input placeholder="Serengeti Kati Kati" />
        </ItemLayout>
        <ItemLayout>
          <AssetLabel
            label="Drop Off"
            caption="What is the Drop Off location of this transfer"
          />
          <Input placeholder="Pemben House" />
        </ItemLayout>
      </div>
    </section>
  );
}
