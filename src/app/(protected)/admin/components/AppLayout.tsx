"use client";
import ConfigMenu from "@/app/(protected)/admin/components/ConfigMenu";
import { AppShell, Burger, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { ReactNode, useState } from "react";
import NavLinks from "./NavLinks/NavLinks";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { data: session } = useSession();
  const [opened, { toggle }] = useDisclosure();

  const [title, setTitle] = useState("");
  const handleLinkChange = (title: string) => {
    setTitle(title);
  };

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "md", collapsed: { mobile: !opened } }}
      padding="md"
      className="text-white"
    >
      <AppShell.Header className="bg-primary-900">
        <Group h="100%" px="md" className="flex justify-between">
          <div>
            <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" color="white" />
            <Text className="hidden text-xl font-bold uppercase md:block">{title}</Text>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Text>{session?.user.names}</Text>
            <ConfigMenu />
          </div>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" className="bg-primary-900">
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" color="white" />
          <img src="/vivo-vivo.svg" className="sm:mx-auto sm:w-28" alt="vivo vivo logo" />
        </Group>
        <NavLinks onPathChange={handleLinkChange} />
      </AppShell.Navbar>
      <AppShell.Main className="bg-primary-900 flex">
        <div className="flex w-full flex-col text-black">{children}</div>
      </AppShell.Main>
    </AppShell>
  );
}
