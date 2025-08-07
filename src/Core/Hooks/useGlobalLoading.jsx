import { create } from 'zustand'

export const useGlobalLoading = create((set) => ({
  axiosLoading: false,
  setAxiosLoading: (val) => set({ axiosLoading: val }),
}))
