import { APP_ROLES } from "@/constants/roles";
import {
  IconChartHistogram,
  IconInfoTriangle,
  IconMap2,
  IconMapPin,
  IconMapRoute,
  IconUsers
} from "@tabler/icons-react";

export type Path = {
  label: string;
  href: string;
  icon: React.ComponentType;
  roles: APP_ROLES[];
};

enum ROUTES {
  ADMIN_HOME = "/admin/home",
  ADMIN_USERS = "/admin/users",
  ADMIN_INCIDENT_TYPES = "/admin/incident-types",
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
  [ROUTES.ADMIN_INCIDENT_TYPES]: [APP_ROLES.ADMIN, APP_ROLES.SUPER_ADMIN],
  [ROUTES.ADMIN_SCHEDULES]: [APP_ROLES.ADMIN, APP_ROLES.SUPER_ADMIN],
  [ROUTES.ADMIN_ZONES]: [APP_ROLES.ADMIN, APP_ROLES.SUPER_ADMIN, APP_ROLES.WATCHMAN],
  [ROUTES.ADMIN_HOSPITALS]: [APP_ROLES.ADMIN, APP_ROLES.SUPER_ADMIN],
  [ROUTES.ADMIN_ALARMS]: [APP_ROLES.ADMIN, APP_ROLES.SUPER_ADMIN, APP_ROLES.WATCHMAN],
  [ROUTES.ADMIN_HEAT_MAP]: [APP_ROLES.ADMIN, APP_ROLES.SUPER_ADMIN, APP_ROLES.WATCHMAN],
  [ROUTES.ADMIN_DASHBOARD]: [APP_ROLES.ADMIN, APP_ROLES.SUPER_ADMIN, APP_ROLES.WATCHMAN],
  [ROUTES.USER_INCIDENTS]: [APP_ROLES.ADMIN, APP_ROLES.SUPER_ADMIN, APP_ROLES.WATCHMAN]
};

export const defaultRoutes: Record<APP_ROLES, ROUTES> = {
  [APP_ROLES.WATCHMAN]: ROUTES.USER_INCIDENTS,
  [APP_ROLES.ADMIN]: ROUTES.ADMIN_USERS,
  [APP_ROLES.SUPER_ADMIN]: ROUTES.ADMIN_USERS,
  [APP_ROLES.USER]: ROUTES.USER_INCIDENTS
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
    label: "Tipos de incidentes",
    href: ROUTES.ADMIN_INCIDENT_TYPES,
    icon: IconInfoTriangle,
    roles: routeRoles[ROUTES.ADMIN_INCIDENT_TYPES]
  },
  {
    label: "Zonas",
    href: ROUTES.ADMIN_ZONES,
    icon: IconMapRoute,
    roles: routeRoles[ROUTES.ADMIN_ZONES]
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
  // {
  //   label: "Hospitales",
  //   href: ROUTES.ADMIN_HOSPITALS,
  //   icon: IconHospital,
  //   roles: routeRoles[ROUTES.ADMIN_HOSPITALS]
  // },
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
  },
  {
    label: "Reportes",
    href: ROUTES.ADMIN_DASHBOARD,
    icon: IconChartHistogram,
    roles: routeRoles[ROUTES.ADMIN_DASHBOARD]
  }
];
