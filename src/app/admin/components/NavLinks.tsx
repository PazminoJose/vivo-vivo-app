"use client";
import NextNavLink from "@/components/NextNavLink";
import { cn } from "@/lib/utils";
import { IconBuildingHospital, IconHome, IconMap2, IconMapRoute } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const links = [
  // { label: "Inicio", href: "/admin/home", icon: IconHome },
  { label: "Usuarios", href: "/admin/users", icon: IconHome },
  { label: "Zonas", href: "/admin/zones", icon: IconMapRoute },
  { label: "Hospitales", href: "/admin/hospitals", icon: IconBuildingHospital },
  // { label: "Alarmas", href: "/admin/alarms", icon: IconMapPin },
  { label: "Mapa de calor", href: "/admin/heat-map", icon: IconMap2 }
  // { label: "Reportes", href: "/admin/dashboard", icon: IconChartHistogram }
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
              " mt-2 rounded-lg hover:bg-primary-600",
              pathname === link.href && "bg-primary-600 font-bold"
            )}
          />
        );
      })}
    </>
  );
}
