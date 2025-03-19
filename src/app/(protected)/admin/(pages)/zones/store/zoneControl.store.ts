import { VigilancePoint, Zone } from "@/models/zone.model";
import { create } from "zustand";

interface ZoneControlStore {
  zones: Zone[];
  setZones: (zones: Zone[]) => void;
  selectedZone: Zone | null;
  setSelectedZone: (zone: Zone | null) => void;
  currentColor: string | null;
  setCurrentColor: (color: string | null) => void;
  isEditingOrCreating: boolean;
  setIsEditingOrCreating: (value: boolean) => void;
  //Vigilance Points
  blockClickablePolygon: boolean;
  setBlockClickablePolygon: (value: boolean) => void;
  showVigilancePointsInZone: Record<number, boolean>;
  setShowVigilancePointsInZone: (zoneID: number, value: boolean) => void;
  isAddingOrEditingVigilancePoint: boolean;
  setIsAddingOrEditingVigilancePoint: (value: boolean) => void;
  vigilancePoints: VigilancePoint[];
  addVigilancePoint: (vigilancePoint: VigilancePoint) => void;
  removeVigilancePoint: (index: number) => void;
  setVigilancePoints: (vigilancePoints: VigilancePoint[]) => void;
}

const initialState: ZoneControlStore = {
  zones: [],
  setZones: () => {},
  selectedZone: null,
  setSelectedZone: () => {},
  currentColor: "#000000",
  setCurrentColor: () => {},
  isEditingOrCreating: false,
  setIsEditingOrCreating: () => {},
  //Vigilance Points
  blockClickablePolygon: false,
  setBlockClickablePolygon: () => {},
  showVigilancePointsInZone: {},
  setShowVigilancePointsInZone: () => {},
  isAddingOrEditingVigilancePoint: false,
  setIsAddingOrEditingVigilancePoint: () => {},
  vigilancePoints: [],
  addVigilancePoint: () => {},
  removeVigilancePoint: () => {},
  setVigilancePoints: () => {}
};

export const useZoneControlStore = create<ZoneControlStore>((set, get) => ({
  ...initialState,
  setZones: (zones) => set({ zones }),
  setSelectedZone: (selectedZone) => set({ selectedZone }),
  setCurrentColor: (color) => set({ currentColor: color }),
  setIsEditingOrCreating: (value) => set({ isEditingOrCreating: value }),
  setIsAddingOrEditingVigilancePoint: (value) => set({ isAddingOrEditingVigilancePoint: value }),
  //Vigilance Points
  setBlockClickablePolygon: (value) => set({ blockClickablePolygon: value }),
  setShowVigilancePointsInZone: (zoneID, value) =>
    set((state) => ({
      showVigilancePointsInZone: { ...state.showVigilancePointsInZone, [zoneID]: value }
    })),
  setVigilancePoints: (vigilancePoints) => set({ vigilancePoints }),
  addVigilancePoint: (vigilancePoint) =>
    set((state) => ({ vigilancePoints: [...state.vigilancePoints, vigilancePoint] })),
  removeVigilancePoint: (index) =>
    set((state) => ({ vigilancePoints: state.vigilancePoints.filter((_, i) => i !== index) }))
}));
