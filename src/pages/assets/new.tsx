import React from "react";
import Input from "~/components/ui/Input";
import { Textarea } from "~/components/ui/TextArea";
import CategoryDropDown from "~/components/Assets/CategoryDropDown";
import Button from "~/components/ui/Button";

function AssetLabel({ label, caption }: { label: string; caption?: string }) {
  return (
    <div className="max-w-[400px] ">
      <h3 className="text-base font-medium">{label}</h3>
      <h3 className="text-sm">{caption}</h3>
    </div>
  );
}

function ItemLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`grid grid-cols-2 items-center gap-[50px] `}>
      {children}
    </div>
  );
}

export default function Page() {
  return (
    <main className="mt-[40px] pl-[30px]">
      <h3 className="text-2xl font-medium ">Untitled Asset</h3>
      <section className="relative mt-[50px] flex flex-col space-y-[30px] ">
        <ItemLayout>
          <AssetLabel label="Name" />
          <Input />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel label="Main Image" />
          <div>
            <p className="text-sm">Accepts PNG, JPG or JPEG (max.4 MB)</p>
            <Input type="file" />
          </div>
        </ItemLayout>

        <ItemLayout>
          <AssetLabel
            label="Tags"
            caption="Tags can help you organise your database. They can be combined. Create tags"
          />

          <CategoryDropDown />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel
            label="Category"
            caption="Make it unique. Each asset can have 1 category. It will show on your index."
          />
          <CategoryDropDown />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel
            label="Value"
            caption="Specify the value of assets to get an idea of the total value of your inventory."
          />

          <Input placeholder="Enter the value in Tsh" />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel
            label="Description"
            caption="This is the initial object description. It will be shown on the asset’s overview page. You can always change it. Maximum 1000 characters."
          />

          <Textarea placeholder="Add a description of your asset" />
        </ItemLayout>
      </section>
        <Button className="mt-[50px] w-[100px]">Save</Button>
    </main>
  );
}
