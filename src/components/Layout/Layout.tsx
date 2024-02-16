import * as React from "react";
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import SignUpForm from "~/components/auth/SignUpPage";
import LoginForm from "~/components/auth/LoginPage"

import SideBar from "./SideBar";
type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <>
      <SignedIn>
        {/* <section>
          <div className="font- flex space-x-[300px] ">
            <SideBar />
            <main className="">{children}</main>
          </div>
        </section> */}
       <LoginForm/>
      </SignedIn>

      <SignedOut>
        {/* <section className="flex h-screen items-center justify-center">
          <SignUpForm />
        </section> */}
      </SignedOut>
    </>
  );
}
