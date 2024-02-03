import React, { ReactElement, useState } from "react";
import { UploadCloud } from "lucide-react";
import { Upload } from "antd";
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
import { v4 as uuidv4 } from "uuid";
import { supabase } from "~/utils/supabase";
import { useToast } from "~/utils/hooks/useToast";
import { Toaster } from "~/components/ui/toaster";
import { ToastAction } from "~/components/ui/Toast";
import { Spinner } from "~/components/trips/LoadingSkeleton";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const destinationSchema = z.object({
  name: z.string(),
  description: z.string(),
});

type DestinationValidationSchema = z.infer<typeof destinationSchema>;

const Page: NextPageWithLayout = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);

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
  const { toast } = useToast();
  const { mutateAsync, isLoading } =
    api.destinations.newDestination.useMutation({
      onSuccess: () => {
        toast({
          description: "You have succesfully added a new Destination",
        });
        reset();
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `${error.message}`,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
          duration: 1500,
        });
      },
    });

  const onSubmit: SubmitHandler<DestinationValidationSchema> = async (data) => {
    try {
      const imgUrls: Array<string> = [];

      const uploadFile = async (file: File) => {
        const fileName = uuidv4();
        const extensionType = file.type?.split("/")[1];

        try {
          const { data, error } = await supabase.storage
            .from("destination_images")
            .upload(`${fileName}.${extensionType}`, file);

          if (error) {
            console.error("Error uploading file:", error.message);
            return null;
          }

          // @ts-expect-error
          return data?.fullPath;
        } catch (error) {
          // @ts-expect-error
          console.error("Error uploading file:", error.message);
          return null;
        }
      };

      const uploadAllFiles = async () => {
        setLoading(true);
        // @ts-expect-error
        const uploadPromises = fileList.map(uploadFile);
        const uploadedPaths = await Promise.all(uploadPromises);

        // Filter out any null values (failed uploads)
        const successfulPaths = uploadedPaths.filter((path) => path !== null);

        // Now you can use successfulPaths or update your imgUrls array
        imgUrls.push(...successfulPaths);

        mutateAsync({
          name: data.name,
          description: data.description,
          imgUrls: imgUrls,
        });
        setFileList([]);
        setLoading(false);
      };

      uploadAllFiles();
    } catch (cause) {
      console.log(cause);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `Failed to create the destination`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        duration: 1500,
      });
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DestinationValidationSchema>({
    resolver: zodResolver(destinationSchema),
  });
  return (
    <main className="mt-[50px] pl-5">
      <h3 className="text-2xl font-medium ">New Destination</h3>
      <Toaster />
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
            </div>
          </ItemLayout>
        </section>

        <Button type="submit" className="mt-5 w-full" disabled={loading}>
          {isLoading ? <Spinner /> : <p>Submit</p>}
        </Button>
      </form>
    </main>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
