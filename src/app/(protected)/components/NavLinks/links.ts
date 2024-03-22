import { APP_ROLES } from "@/constants/roles";
import { IconHome, IconHospital, IconMap2, IconMapRoute } from "@tabler/icons-react";
import { Link } from "./NavLinks";

const adminLinks: Link[] = [
  // { label: "Inicio", href: "/admin/home", icon: IconHome },
  { label: "Usuarios", href: "/admin/users", icon: IconHome },
  // { label: "Horarios policía", href: "/admin/schedules", icon: IconCalendarTime },
  { label: "Zonas", href: "/admin/zones", icon: IconMapRoute },
  { label: "Hospitales", href: "/admin/hospitals", icon: IconHospital },
  // { label: "Alarmas", href: "/admin/alarms", icon: IconMapPin },
  { label: "Mapa de calor", href: "/admin/heat-map", icon: IconMap2 }
  // { label: "Reportes", href: "/admin/dashboard", icon: IconChartHistogram }
];

const userLinks: Link[] = [{ label: "Incidentes", href: "/user/incidents", icon: IconMap2 }];

export const LINKS = {
  [APP_ROLES.ADMIN]: adminLinks,
  [APP_ROLES.SUPER_ADMIN]: adminLinks,
  [APP_ROLES.POLICE]: adminLinks,
  [APP_ROLES.USER]: userLinks,
  [APP_ROLES.MEDIC]: userLinks
};
