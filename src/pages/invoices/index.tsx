import Layout from "~/components/Layout/Layout";
import { Header, NoAsset } from "~/components/Assets";
import { ReactElement } from "react";
import { api } from "~/utils/api";
import LoadingSkeleton from "~/components/trips/LoadingSkeleton";

function Page() {
  return <main className="pl-5">
    <p>All Invoices</p>
  </main>;
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
