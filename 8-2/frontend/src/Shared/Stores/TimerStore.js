import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTimerStore = create(
  persist((set, get) => ({}), {
    name: "timer-storage",
    partialize: (state) => ({}),
  })
);
