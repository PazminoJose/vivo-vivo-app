"use client";
import NextNavLink from "@/components/NextNavLink";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export type Link = {
  label: string;
  href: string;
  icon: React.ComponentType;
};

interface NavLinksProps {
  links: Link[];
  onPathChange: (label: string) => void;
}

export default function NavLinks({ onPathChange, links }: NavLinksProps) {
  const pathname = usePathname();
  useEffect(() => {
    const link = links.find((link) => link.href === pathname);
    onPathChange(link?.label || "");
  }, [pathname, onPathChange]);
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <NextNavLink
            key={link.label}
            label={link.label}
            href={link.href}
            leftSection={<LinkIcon />}
            className={cn(
              " mt-2 rounded-lg hover:bg-primary-600",
              pathname === link.href && "bg-primary-600 font-bold"
            )}
          />
        );
      })}
    </>
  );
}
