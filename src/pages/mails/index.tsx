import { Mail } from "~/components/Mail/Mail";
import { mails } from "~/components/Mail//data";
import Layout from "~/components/Layout/Layout";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import LoadingSkeleton from "~/components/trips/LoadingSkeleton";

const Page: NextPageWithLayout = () => {
  const defaultLayout = undefined;
  const user = useUser();
  const { data, isLoading } = api.createMail.byOrganization.useQuery({
    email: user.user?.primaryEmailAddress?.emailAddress as unknown as string,
  });
  console.log(data);
  return (
    <>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="hidden flex-col pt-10 md:flex">
          <Mail mails={mails} defaultLayout={defaultLayout} />
        </div>
      )}
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
