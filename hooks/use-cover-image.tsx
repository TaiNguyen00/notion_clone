import {create} from "zustand"

type CoverImageStore = {
  url?: string
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onReplace: (url: string) => void;
}


export const useCoverImage = create<CoverImageStore>((set, get) => ({
  url: undefined,
  isOpen: false,
  // trong truong hop neu nguoi dung quen chua acp thay doi anh, thi nen set url = un tranh trg hop luu lai url trc do
  onOpen: () => set({isOpen: true, url: undefined}),
  onClose: () => set({isOpen: false, url: undefined}),
  onReplace: (url: string) => set({isOpen: true, url})
}))