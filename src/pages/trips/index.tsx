import Layout from "~/components/Layout/Layout";
import { Header, NoAsset } from "~/components/Assets";

export default function Page() {
  return (
    <Layout>
      <main className="pl-5">
        <Header title="Tazama Trips" href="/trips/new" />
        <NoAsset
          bigTitle="You dont have any assets yet"
          smallTitle=" What are you waiting for? Go ahead and add one now."
          c2a="Add New Asset"
          c2aUrl="/assets/new"
        />
      </main>
    </Layout>
  );
}
