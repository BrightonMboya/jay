import * as React from "react";
import SideBar from "./SideBar";
type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <section>
      <div className="flex space-x-5 font-sans ">
        <SideBar />
        <main className="">{children}</main>
      </div>
    </section>
  );
}
