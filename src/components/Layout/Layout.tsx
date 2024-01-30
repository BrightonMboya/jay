import * as React from "react";
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import SignUpForm from "~/components/auth/SignUpPage";

import SideBar from "./SideBar";
type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <>
      <SignedIn>
        <section>
          <div className="font- flex space-x-[200px] ">
            <SideBar />
            <main className="">{children}</main>
          </div>
        </section>
      </SignedIn>

      <SignedOut>
        <section className="flex h-screen items-center justify-center">
          <SignUpForm />
        </section>
      </SignedOut>
    </>
  );
}
