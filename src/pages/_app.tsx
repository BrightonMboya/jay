import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

import { Montserrat } from "next/font/google";
import Layout from "~/components/Layout/Layout";
;

const monsterrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat"
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    // <Layout>
      <main className={`${monsterrat.className}`}>
        <Component {...pageProps} />
      </main>
    // </Layout>
  );
};

export default api.withTRPC(MyApp);
