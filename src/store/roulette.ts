import { create } from "zustand";

interface Item {
  name: string;
  weight: number;
}

interface RouletteState {
  items: Item[];
  setItems: (items: Item[]) => void;
  result: Item | null;
  setResult: (result: Item | null) => void;
  addItem: (name: string, weight: number) => void;
  removeItem: (name: string) => void;
  pickWithWeight: () => void;
  reset: () => void;
}

export const useRouletteStore = create<RouletteState>((set) => ({
  items: [],
  setItems: (items) => {
    set({ items });
  },
  result: null,
  setResult: (result) => {
    set({ result });
  },
  addItem: (name, weight) =>
    set((state) => ({ items: [...state.items, { name, weight }] })),
  removeItem: (name) =>
    set((state) => ({
      items: state.items.filter((item) => item.name !== name),
    })),
  pickWithWeight: () => {
    set((state) => {
      const totalWeight = state.items.reduce(
        (acc, item) => acc + item.weight,
        0,
      );
      const random = Math.random() * totalWeight;

      let cumulativeWeight = 0;
      const selectedItem = state.items.find((item) => {
        cumulativeWeight += item.weight;
        return random < cumulativeWeight;
      });

      return { result: selectedItem || null };
    });
  },
  reset: () => set({ items: [], result: null }),
}));
