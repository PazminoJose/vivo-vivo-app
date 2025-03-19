"use client";
import { cn } from "@/lib/utils";
import { Zone } from "@/models/zone.model";
import { Card } from "@mantine/core";
import ZoneMenu from "./ZoneMenu";

interface CardZoneProps {
  zone: Zone;
}

export default function CardZone({ zone }: CardZoneProps) {
  const isDisabled = zone.state !== 1;

  return (
    <Card
      className={cn(
        "border-primary-400 mt-4 flex flex-row justify-between gap-3 border p-2",
        isDisabled ? "bg-primary-300" : "!bg-white"
      )}
    >
      <h2 className="text-lg font-bold" style={{ color: !isDisabled ? zone.zoneColor : "gray" }}>
        {zone.zoneName}
      </h2>
      <ZoneMenu zone={zone} />
    </Card>
  );
}
