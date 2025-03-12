'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    name: "Evaluación Actual",
    href: "/active-review/current",
  },
  {
    name: "Resultados",
    href: "/active-review/results",
  },
  {
    name: "Evaluaciones Externas",
    href: "/active-review/external",
  },
];

export default function ActiveReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-2 border-b pb-2">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant={pathname === item.href ? "default" : "ghost"}
            asChild
          >
            <Link href={item.href}>{item.name}</Link>
          </Button>
        ))}
      </div>
      {children}
    </div>
  );
}