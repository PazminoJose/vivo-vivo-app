import { APP_ROLES } from "@/constants/roles";
import {
  IconHome,
  IconHospital,
  IconMap2,
  IconMapPin,
  IconMapRoute,
  IconUsers
} from "@tabler/icons-react";
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

export type Path = {
  label: string;
  href: string;
  icon: React.ComponentType;
  roles: APP_ROLES[];
};

enum ROUTES {
  ADMIN_HOME = "/admin/home",
  ADMIN_USERS = "/admin/users",
  ADMIN_SCHEDULES = "/admin/schedules",
  ADMIN_ZONES = "/admin/zones",
  ADMIN_HOSPITALS = "/admin/hospitals",
  ADMIN_ALARMS = "/admin/alarms",
  ADMIN_HEAT_MAP = "/admin/heat-map",
  ADMIN_DASHBOARD = "/admin/dashboard",
  USER_INCIDENTS = "/admin/incidents"
}

const routeRoles = {
  [ROUTES.ADMIN_HOME]: [APP_ROLES.ADMIN, APP_ROLES.SUPER_ADMIN],
  [ROUTES.ADMIN_USERS]: [APP_ROLES.ADMIN, APP_ROLES.SUPER_ADMIN],
  [ROUTES.ADMIN_SCHEDULES]: [APP_ROLES.ADMIN, APP_ROLES.SUPER_ADMIN],
  [ROUTES.ADMIN_ZONES]: [APP_ROLES.ADMIN, APP_ROLES.SUPER_ADMIN],
  [ROUTES.ADMIN_HOSPITALS]: [APP_ROLES.ADMIN, APP_ROLES.SUPER_ADMIN],
  [ROUTES.ADMIN_ALARMS]: [APP_ROLES.ADMIN, APP_ROLES.SUPER_ADMIN],
  [ROUTES.ADMIN_HEAT_MAP]: [APP_ROLES.ADMIN, APP_ROLES.SUPER_ADMIN],
  [ROUTES.ADMIN_DASHBOARD]: [APP_ROLES.ADMIN, APP_ROLES.SUPER_ADMIN],
  [ROUTES.USER_INCIDENTS]: [APP_ROLES.ADMIN, APP_ROLES.SUPER_ADMIN]
};

export const paths: Path[] = [
  // {
  //   label: "Inicio",
  //   href: ROUTES.ADMIN_HOME,
  //   icon: IconHome,
  //   roles: routeRoles[ROUTES.ADMIN_HOME]
  // },
  {
    label: "Usuarios",
    href: ROUTES.ADMIN_USERS,
    icon: IconUsers,
    roles: routeRoles[ROUTES.ADMIN_USERS]
  },
  {
    label: "Incidentes",
    href: ROUTES.USER_INCIDENTS,
    icon: IconMapPin,
    roles: routeRoles[ROUTES.USER_INCIDENTS]
  },
  // {
  //   label: "Horarios policía",
  //   href: ROUTES.ADMIN_SCHEDULES,
  //   icon: IconHome,
  //   roles: routeRoles[ROUTES.ADMIN_SCHEDULES]
  // },
  {
    label: "Zonas",
    href: ROUTES.ADMIN_ZONES,
    icon: IconMapRoute,
    roles: routeRoles[ROUTES.ADMIN_ZONES]
  },
  {
    label: "Hospitales",
    href: ROUTES.ADMIN_HOSPITALS,
    icon: IconHospital,
    roles: routeRoles[ROUTES.ADMIN_HOSPITALS]
  },
  // {
  //   label: "Alarmas",
  //   href: ROUTES.ADMIN_ALARMS,
  //   icon: IconMapPin,
  //   roles: routeRoles[ROUTES.ADMIN_ALARMS]
  // },
  {
    label: "Mapa de calor",
    href: ROUTES.ADMIN_HEAT_MAP,
    icon: IconMap2,
    roles: routeRoles[ROUTES.ADMIN_HEAT_MAP]
  }
  // {
  //   label: "Reportes",
  //   href: ROUTES.ADMIN_DASHBOARD,
  //   icon: IconChartHistogram,
  //   roles: routeRoles[ROUTES.ADMIN_DASHBOARD]
  // }
];
