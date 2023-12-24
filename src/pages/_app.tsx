import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${inter.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
