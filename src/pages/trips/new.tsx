import { AssetLabel, ItemLayout } from "../contacts/new";
import Input from "~/components/ui/Input";
import { GenderDropDown } from "~/components/contacts/GenderDropDown";
import { DatePicker } from "~/components/ui/DatePicker";
import { Textarea } from "~/components/ui/TextArea";
import Button from "~/components/ui/Button";
import Layout from "~/components/Layout/Layout";

export default function Page() {
  return (
    <Layout>
      <main className="mt-[40px] pl-[30px]">
        <h3 className="text-2xl font-medium ">New Safari</h3>
        <section className="relative mt-[50px] flex flex-col space-y-[30px] ">
          <ItemLayout>
            <AssetLabel label="Guest Full Name" />
            <Input placeholder="Jay Gaspary" />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel label="Primary Email" />
            <Input placeholder="doe@gmail.com" />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel
              label="Gender"
              caption="Gender of the guest as it appears in passport"
            />
            <GenderDropDown />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel label="Booked On" caption="When was this trip booked" />
            <DatePicker />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel
              label="Date of Arrival"
              caption="When is this guest arriving"
            />
            <DatePicker />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel
              label="Departure Date"
              caption="When is this guest leaving the country"
            />
            <DatePicker />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel label="No of Days" caption="How long is this tri[" />
            <Input placeholder="2" />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel
              label="Itenary Link"
              caption="Paste the link to the itenary of this trip"
            />
            <Input placeholder="www.wetu.com/itenary" />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel label="Citizenship" />
            <Input placeholder="Denmark" />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel
              label="Notes"
              caption="Enter additional details about this guest"
            />

            <Textarea placeholder="Add short notes about this guest" />
          </ItemLayout>
        </section>
        <Button className="mt-[50px] w-full">Save Trip</Button>
      </main>
    </Layout>
  );
}
