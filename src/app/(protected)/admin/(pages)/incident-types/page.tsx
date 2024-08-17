"use client";
import { Tabs, TabsPanel } from "@mantine/core";
import IncidentTypesHierarchyTable from "./components/IncidentTypesHierarchyTable/IncidentTypesHierarchyTable";
import IncidentTypesTable from "./components/IncidentTypesTable/IncidentTypesTable";

const TABS = [
  {
    title: "Tipos de incidentes",
    value: "incidents",
    component: IncidentTypesTable
  },
  {
    title: "Jerarquía de tipos de incidentes",
    value: "incidentsHierarchy",
    component: IncidentTypesHierarchyTable
  }
];

export default function IncidentTypesPage() {
  return (
    <Tabs defaultValue="incidents">
      <Tabs.List className="mb-2">
        {TABS.map((tab) => (
          <Tabs.Tab key={tab.value} className="hover:bg-white/20" value={tab.value}>
            {tab.title}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {TABS.map((tab) => (
        <TabsPanel key={tab.value} value={tab.value}>
          <tab.component />
        </TabsPanel>
      ))}
    </Tabs>
  );
}
