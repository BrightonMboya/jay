import Head from "next/head";
import Link from "next/link";
import Navigation from "~/components/landingPage/Navigation";
import Hero from "~/components/landingPage/Hero";

import { api } from "~/utils/api";
import Section1 from "~/components/landingPage/Section1";
import Section2 from "~/components/landingPage/Section2";
import Testimonials from "~/components/landingPage/Testimonial";
import Pricing from "~/components/landingPage/Pricing";
import CTA from "~/components/landingPage/cta";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Navigation />
      <Hero/>
      <Section1/>
      <Section2/>
      <Testimonials/>
      <Pricing/>
      <CTA/>
    </>
  );
}
