import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

export const metadata = {
  title: "Dashboard",
  description: "Your dashboard page",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ display: "flex", flexDirection: "row", background: "#f3f4f6" }}
    >
      <SideBar />
      <div style={{ width: "100%" }}>
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
