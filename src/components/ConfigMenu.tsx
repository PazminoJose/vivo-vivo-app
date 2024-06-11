"use client";
import { Menu } from "@mantine/core";
import { IconLockSquareRounded, IconLogout, IconSettingsFilled } from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ConfigMenu() {
  const router = useRouter();
  const handleSignOut = async () => {
    const { url } = await signOut({ callbackUrl: "/", redirect: false });
    router.push(url);
  };
  return (
    <div>
      <Menu withArrow>
        <Menu.Target>
          <IconSettingsFilled className="hover:cursor-pointer" />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item leftSection={<IconLockSquareRounded />} onClick={async () => await handleSignOut()}>
            Cambiar contraseña
          </Menu.Item>
          <Menu.Item leftSection={<IconLogout />} onClick={async () => await handleSignOut()}>
            Cerrar Sesión
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
