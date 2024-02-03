import React, { ReactElement, useState } from "react";
import { UploadCloud } from "lucide-react";
import { message, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { NextPageWithLayout } from "~/pages/_app";
import Layout from "~/components/Layout/Layout";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ItemLayout, AssetLabel } from "~/pages/contacts/new";
import Input from "~/components/ui/Input";
import { Textarea } from "~/components/ui/TextArea";
import Button from "~/components/ui/Button";
import { api } from "~/utils/api";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const destinationSchema = z.object({
  name: z.string(),
  description: z.string(),
});

type DestinationValidationSchema = z.infer<typeof destinationSchema>;

const Page: NextPageWithLayout = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file as FileType);
    });
  };

  const onSubmit: SubmitHandler<DestinationValidationSchema> = (data) => {
    console.log(fileList);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DestinationValidationSchema>({
    resolver: zodResolver(destinationSchema),
  });
  return (
    <main className="mt-[50px] pl-5">
      <h3 className="text-2xl font-medium ">New Destination</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="relative flex flex-col space-y-[30px] pt-10 ">
          <ItemLayout>
            <AssetLabel
              label="Destination Name"
              caption="Enter a common name for this destination"
            />
            <Input placeholder="Serengeti" {...register("name")} />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel
              label="Description"
              caption="Give a short description of this place and hook the guests to visit it"
            />
            <Textarea
              placeholder="A short description to hook the guests to visit this place"
              rows={10}
              {...register("description")}
            />
          </ItemLayout>

          <ItemLayout>
            <AssetLabel
              label="Pictures"
              caption="Add pictures for this destination to add visual appetite"
            />
            <div>
              <Upload {...props} className="font-montserrat">
                <div className="flex cursor-pointer items-center space-x-3 rounded-md bg-lightest px-5 py-2 shadow-md hover:bg-lighter">
                  <UploadCloud />
                  <p>Select Images</p>
                </div>
              </Upload>
              {/* <Button
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{ marginTop: 16 }}
              >
                {uploading ? "Uploading" : "Start Upload"}
              </Button> */}
            </div>
          </ItemLayout>
        </section>

        <Button type="submit">Submit</Button>
      </form>
    </main>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
