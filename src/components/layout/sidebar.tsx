"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Uploads", href: "/upload" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-background p-6 flex flex-col">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold">SX Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Intelligence Platform
        </p>
      </div>

      {/* NAV */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                block rounded-lg px-4 py-3 transition
                ${isActive
                  ? "bg-muted font-medium"
                  : "hover:bg-muted"
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}