import Layout from "~/components/Layout/Layout";
import { Header, NoAsset } from "~/components/Assets";
import { TripsList } from "~/components/trips/TripsList";
import { useUser } from "@clerk/nextjs";
import { type NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import { api } from "~/utils/api";
import LoadingSkeleton from "~/components/trips/LoadingSkeleton";

const Page: NextPageWithLayout = () => {
  const user = useUser();
  console.log(user.user?.primaryEmailAddress?.emailAddress);
  const { data } = api.trips.byOrganization.useQuery({
    email: user.user?.primaryEmailAddress?.emailAddress as unknown as string,
  });
  return (
    <main className="pl-5">
      <Header title="Tazama Trips" href="/trips/new" />
      {data?.length === 0 && (
        <NoAsset
          bigTitle="You dont have any trips added"
          smallTitle=" What are you waiting for? Go ahead and add one now."
          c2a="Add Trips"
          c2aUrl="/trips/new"
        />
      )}
      {data ? <TripsList trips={data} /> : <LoadingSkeleton />}
    </main>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
