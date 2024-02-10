import { NextPageWithLayout } from "~/pages/_app";
import Layout from "~/components/Layout/Layout";
import React, { ReactElement, useState } from "react";

const Page: NextPageWithLayout = () => {
  return <h3>Hello World</h3>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
