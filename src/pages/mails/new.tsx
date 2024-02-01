import Layout from "~/components/Layout/Layout";
import { AssetLabel, ItemLayout } from "../contacts/new";
import Input from "~/components/ui/Input";
import { Textarea } from "~/components/ui/TextArea";
import Button from "~/components/ui/Button";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";

const mailSchema = z.object({
  name: z.string().min(1),
  label: z.string().min(1),
  body: z.string().min(1),
});

type MailValidationSchema = z.infer<typeof mailSchema>;

const Page: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MailValidationSchema>({
    resolver: zodResolver(mailSchema),
  });

  const onSubmit: SubmitHandler<MailValidationSchema> = (data) => {
    console.log(data);
    const file = new Blob([data.body], { type: "text/plain" });
    const blobUrl = URL.createObjectURL(file);
    const previewContainer = document.getElementById("previewContainer");
    if (previewContainer) {
      previewContainer.src = blobUrl;
    }
    console.log(file);
  };

  console.log(errors);
  return (
    <main className="mt-[50px]">
      <h1 className="text-xl font-bold">Add New Email Template</h1>
      <iframe
        id="previewContainer"
        title="Blob Preview"
        width="100%"
        height="200px"
      ></iframe>
      <form
        className="relative  mt-10 flex flex-col space-y-[30px] "
        onSubmit={handleSubmit(onSubmit)}
      >
        <ItemLayout>
          <AssetLabel
            label="Email Name"
            caption="Give your email a unique email"
          />
          <Input placeholder="Onboarding Email" {...register("name")} />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel
            label="Tags"
            caption="Tags easily allow you to search through your email templates"
          />
          <Input placeholder="pre-trip" {...register("label")} />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel
            label="body"
            caption="Enter the content of your email here"
          />
          <Textarea
            placeholder="Hello John, thank you for choosing to travel with us ..."
            rows={15}
            {...register("body")}
          />
        </ItemLayout>
        <Button className="mt-[50px] w-full" type="submit">
          Add Email
        </Button>
      </form>
    </main>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
