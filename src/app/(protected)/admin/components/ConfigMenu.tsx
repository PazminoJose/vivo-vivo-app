"use client";
import { Menu } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconLockSquareRounded, IconLogout, IconSettingsFilled } from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import FormChangePassword from "./FormChangePassword/FormChangePassword";

export default function ConfigMenu() {
  const router = useRouter();

  const handleChangePassword = () => {
    modals.open({
      children: <FormChangePassword />
    });
  };

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
          <Menu.Item leftSection={<IconLockSquareRounded />} onClick={handleChangePassword}>
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
