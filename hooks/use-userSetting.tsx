import { create } from "zustand";

type userSettingStore = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;

}

export const useSettings = create<userSettingStore>((set) => ({
  isOpen: false,
  onClose: () => set({isOpen: false}),
  onOpen: () => set({isOpen: true})
}))