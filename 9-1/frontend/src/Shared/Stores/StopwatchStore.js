import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStopwatchStore = create(
  persist((set, get) => ({}), {
    name: "stopwatch-storage",
    partialize: (state) => ({}),
  })
);
