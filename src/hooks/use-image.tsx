import { create } from 'zustand'

type ImageStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useImage = create<ImageStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
