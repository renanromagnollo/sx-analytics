import { ReactNode } from "react";

import { Sidebar }
  from "./sidebar";

import { Header }
  from "./header";

type Props = {
  children: ReactNode;
};

export function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Header />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}