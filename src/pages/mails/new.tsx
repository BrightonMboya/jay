import Layout from "~/components/Layout/Layout";
import { AssetLabel, ItemLayout } from "../contacts/new";
import Input from "~/components/ui/Input";
import { Textarea } from "~/components/ui/TextArea";
import Button from "~/components/ui/Button";

export default function Page() {
  return (
    <Layout>
      <main className="mt-[50px]">
        <h1 className="text-xl font-bold">Add New Email Template</h1>
        <section className="relative  flex flex-col space-y-[30px] mt-10 ">
          <ItemLayout>
            <AssetLabel
              label="Email Name"
              caption="Give your email a unique email"
            />
            <Input placeholder="Onboarding Email" />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel
              label="Tags"
              caption="Tags easily allow you to search through your email templates"
            />
            <Input placeholder="pre-trip" />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel
              label="body"
              caption="Enter the content of your email here"
            />
            <Textarea
              placeholder="Hello John, thank you for choosing to travel with us ..."
              rows={15}
            />
          </ItemLayout>
        </section>
        <Button className="mt-[50px] w-full">Add Email</Button>
      </main>
    </Layout>
  );
}
