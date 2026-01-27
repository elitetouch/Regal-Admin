import type { Metadata } from "next";
import { Prompt, Raleway } from "next/font/google";
import SideBar from "../Components/Sidebar/SideBar";
import Navbar from "../Components/Navbar/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className=" flex ">
        <div className="fixed">
          <SideBar />
        </div>
        <div className=" flex-1 pl-[250px]">
          <Navbar />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
