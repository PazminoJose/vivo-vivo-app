"use client";
import NextNavLink from "@/components/next-nav-link";
import { cn } from "@/utils";
import { IconChartHistogram, IconHome, IconMap2, IconMapPin } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const links = [
  { label: "Inicio", href: "/admin", icon: IconHome },
  { label: "Alarmas", href: "/admin/alarms", icon: IconMapPin },
  { label: "Mapa de calor", href: "/admin/heat-map", icon: IconMap2 },
  { label: "Reportes", href: "/admin/dashboard", icon: IconChartHistogram }
];

export default function NavLinks({ onPathChange }: { onPathChange: (label: string) => void }) {
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
              " mt-2 rounded-lg hover:bg-gray-600",
              pathname === link.href && "bg-gray-600 font-bold"
            )}
          />
        );
      })}
    </>
  );
}
