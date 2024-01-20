import Layout from "~/components/Layout/Layout";
import { Header, NoAsset } from "~/components/Assets";
import { TripsList } from "~/components/trips/TripsList";

export default function Page() {
  return (
    <Layout>
      <main className="pl-5">
        <Header title="Tazama Trips" href="/trips/new" />
        {/* <NoAsset
          bigTitle="You dont have any trips added"
          smallTitle=" What are you waiting for? Go ahead and add one now."
          c2a="Add Trips"
          c2aUrl="/trips/new"
        /> */}
        <TripsList />
      </main>
    </Layout>
  );
}
