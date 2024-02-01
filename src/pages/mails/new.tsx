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
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { ToastAction } from "~/components/ui/Toast";
import { useToast } from "~/utils/hooks/useToast";
import LoadingSkeleton from "~/components/trips/LoadingSkeleton";
import { useRouter } from "next/router";
import { Toaster } from "~/components/ui/toaster";

export const mailSchema = z.object({
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
  const router = useRouter();
  const { toast } = useToast();

  const { mutateAsync, isLoading } = api.createMail.create.useMutation({
    onSuccess: () => {
      router.push("/mails");
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
  const user = useUser();

  const onSubmit: SubmitHandler<MailValidationSchema> = async (data) => {
    mutateAsync({
      ...data,
      organizationEmail: user.user?.primaryEmailAddress
        ?.emailAddress as unknown as string,
    });
  };

  return (
    <main className="mt-[50px]">
      <h1 className="text-xl font-bold">Add New Email Template</h1>
      <Toaster />
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
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
      )}
    </main>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
