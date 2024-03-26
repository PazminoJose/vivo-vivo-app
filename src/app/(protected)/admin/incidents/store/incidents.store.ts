import { PoliceLocation } from "@/models/police-location.model";
import { UserInDanger } from "@/models/user-in-danger.model";
import { create } from "zustand";

interface IncidentsStore {
  selectedPoliceLocation: PoliceLocation | null;
  setSelectedPoliceLocation: (selectedPoliceLocation: PoliceLocation | null) => void;
  selectedUserInDanger: Partial<UserInDanger> | null;
  setSelectedUserInDanger: (selectedUserInDanger: Partial<UserInDanger> | null) => void;
  removeSelectedUserInDanger: () => void;
}

const initialState: IncidentsStore = {
  selectedPoliceLocation: null,
  setSelectedPoliceLocation: () => {},
  selectedUserInDanger: null,
  setSelectedUserInDanger: () => {},
  removeSelectedUserInDanger: () => {}
};

export const useIncidentsStore = create<IncidentsStore>((set, get) => ({
  ...initialState,
  setSelectedPoliceLocation: (selectedPoliceLocation) => set({ selectedPoliceLocation }),
  setSelectedUserInDanger: (selectedUserInDanger) =>
    set({ selectedUserInDanger: { ...get().selectedUserInDanger, ...selectedUserInDanger } }),
  removeSelectedUserInDanger: () => set({ selectedUserInDanger: null })
}));
