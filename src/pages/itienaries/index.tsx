import React, { ReactElement, useState } from "react";
import Layout from "~/components/Layout/Layout";
import ItienaryPage from "~/components/itienary/ItienaryPage";

const Page = () => {
  return (
    <main>
      <ItienaryPage />
    </main>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
