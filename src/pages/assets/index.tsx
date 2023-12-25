import { Header, NoAsset } from "~/components/Assets";

export default function Index() {
  return (
    <main className="pl-5">
      <Header />
      <NoAsset
        bigTitle="You dont have any assets yet"
        smallTitle=" What are you waiting for? Go ahead and add one now."
        c2a="Add New Asset"
        c2aUrl="/assets/new"
      />
    </main>
  );
}
