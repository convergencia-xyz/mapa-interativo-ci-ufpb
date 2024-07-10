import type { MetaFunction } from "@remix-run/node";
import { AppShell, Burger, rem, Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconMessageCircle,
  IconPhoto,
  IconSettings,
} from "@tabler/icons-react";
import {
  PrimeiroAndar,
  SegundoAndar,
  Subsolo,
  TerceiroAndar,
  Terreo,
} from "~/components/MapasCI/Salas";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "App: Mapas do Centro de Informática" },
    { name: "description", content: "Protótipo do convergencia.xyz" },
  ];
};

/**
 * Renders a component that displays a set of tabs for different floors of a building.
 * Each tab corresponds to a specific floor and displays the corresponding content when selected.
 */
function Mapas() {
  const iconStyle = { width: rem(12), height: rem(12) };
  const [activeTab, setActiveTab] = useState<string | null>("first");

  return (
    <Tabs value={activeTab} onChange={setActiveTab} variant="pills" radius="xs">
      {/* Tabs List */}
      <Tabs.List>
        <Tabs.Tab
          value="subsolo"
          leftSection={<IconSettings style={iconStyle} />}
        >
          Subsolo
        </Tabs.Tab>
        <Tabs.Tab
          value="terreo"
          leftSection={<IconSettings style={iconStyle} />}
        >
          Térreo
        </Tabs.Tab>
        <Tabs.Tab
          value="primeiro-andar"
          leftSection={<IconSettings style={iconStyle} />}
        >
          Primeiro Andar
        </Tabs.Tab>
        <Tabs.Tab
          value="segundo-andar"
          leftSection={<IconSettings style={iconStyle} />}
        >
          Segundo Andar
        </Tabs.Tab>
        <Tabs.Tab
          value="terceiro-andar"
          leftSection={<IconSettings style={iconStyle} />}
        >
          Terceiro Andar
        </Tabs.Tab>
      </Tabs.List>

      {/* Tabs Panels */}
      <Tabs.Panel value="subsolo">
        <div>
          <Subsolo />
        </div>
      </Tabs.Panel>

      <Tabs.Panel value="terreo">
        <div>
          <Terreo />
        </div>
      </Tabs.Panel>

      <Tabs.Panel value="primeiro-andar">
        <div>
          <PrimeiroAndar />
        </div>
      </Tabs.Panel>
      <Tabs.Panel value="segundo-andar">
        <div>
          <SegundoAndar />
        </div>
      </Tabs.Panel>
      <Tabs.Panel value="terceiro-andar">
        <div>
          <TerceiroAndar />
        </div>
      </Tabs.Panel>
    </Tabs>
  );
}

export default function Index() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <div>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          />
          <div>Logo</div>
        </AppShell.Header>

        <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

        <AppShell.Main>
          <Mapas />
        </AppShell.Main>
      </AppShell>
    </div>
  );
}
