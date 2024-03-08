import { Zone } from "@/models/zone.model";
import { create } from "zustand";

interface ZoneControlStore {
  selectedZone: Zone | null;
  setSelectedZone: (zone: Zone | null) => void;
  currentColor: string | null;
  setCurrentColor: (color: string | null) => void;
  isEditingOrCreating: boolean;
  setIsEditingOrCreating: (value: boolean) => void;
}

const initialState: ZoneControlStore = {
  selectedZone: null,
  setSelectedZone: () => {},
  currentColor: "#000000",
  setCurrentColor: () => {},
  isEditingOrCreating: false,
  setIsEditingOrCreating: () => {}
};

export const useZoneControlStore = create<ZoneControlStore>((set) => ({
  ...initialState,
  setSelectedZone: (selectedZone) => set({ selectedZone }),
  setCurrentColor: (color) => set({ currentColor: color }),
  setIsEditingOrCreating: (value) => set({ isEditingOrCreating: value })
}));
