"use client";
import NextNavLink from "@/components/NextNavLink";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { paths } from "./paths";

export type Link = {
  label: string;
  href: string;
  icon: React.ComponentType;
};

interface NavLinksProps {
  onPathChange: (label: string) => void;
}

export default function NavLinks({ onPathChange }: NavLinksProps) {
  const { data } = useSession();
  const pathname = usePathname();
  useEffect(() => {
    const link = paths.find((path) => path.href === pathname);
    onPathChange(link?.label || "");
  }, [pathname, onPathChange]);
  return (
    <>
      {/* {links.map((link) => {
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
      })} */}
      {paths.map((path) => {
        const LinkIcon = path.icon;
        const userRoles = data?.user?.roles.map((role) => role.roleName);
        if (userRoles && path.roles.some((role) => userRoles.includes(role))) {
          return (
            <NextNavLink
              key={path.label}
              label={path.label}
              href={path.href}
              leftSection={<LinkIcon />}
              className={cn(
                "hover:!bg-primary-600 mt-2 rounded-lg",
                pathname === path.href && "!bg-primary-600 font-bold"
              )}
            />
          );
        }
      })}
    </>
  );
}
