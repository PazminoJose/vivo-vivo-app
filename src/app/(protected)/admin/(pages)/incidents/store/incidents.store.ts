import { UserInDanger } from "@/models/user-in-danger.model";
import { WatchmanLocation } from "@/models/watchman-location.model";
import { create } from "zustand";

interface IncidentsStore {
  selectedWatchmanLocation: WatchmanLocation | null;
  setSelectedWatchmanLocation: (selectedWatchmanLocation: WatchmanLocation | null) => void;
  selectedUserInDanger: Partial<UserInDanger> | null;
  setSelectedUserInDanger: (selectedUserInDanger: Partial<UserInDanger> | null) => void;
  removeSelectedUserInDanger: () => void;
}

const initialState: IncidentsStore = {
  selectedWatchmanLocation: null,
  setSelectedWatchmanLocation: () => {},
  selectedUserInDanger: null,
  setSelectedUserInDanger: () => {},
  removeSelectedUserInDanger: () => {}
};

export const useIncidentsStore = create<IncidentsStore>((set, get) => ({
  ...initialState,
  setSelectedWatchmanLocation: (selectedWatchmanLocation) =>
    set({ selectedWatchmanLocation: selectedWatchmanLocation }),
  setSelectedUserInDanger: (selectedUserInDanger) =>
    set({ selectedUserInDanger: { ...get().selectedUserInDanger, ...selectedUserInDanger } }),
  removeSelectedUserInDanger: () => set({ selectedUserInDanger: null })
}));
