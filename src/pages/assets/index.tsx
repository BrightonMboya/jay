import { Header, NoAsset } from "~/components/Assets";
import Layout from "~/components/Layout/Layout";
export default function Index() {
  return (
    <Layout>
      <main className="pl-5">
        <Header title="Tazama Inventory" href="/trips/new" />
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
