import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type State = {
  // the search term the user has entered
  searchTerm: string;
  // whether to enable chaos mode
  chaos: boolean;
  // the level of flakiness to introduce
  flakiness: number;
  // the debouce delay for the search term query in ms
  debounceDelay: number;
  // the API request delay in ms
  delay: number;
  // set the search term
  setSearchTerm: (searchTerm: string) => void;
  // set whether to enable chaos mode
  setChaos: (chaos: boolean) => void;
  // set the level of flakiness to introduce
  setFlakiness: (flakiness: number) => void;
  // set the debounce delay for the search term query
  setDebounceDelay: (debounceDelay: number) => void;
  // set the delay for the API request
  setDelay: (delay: number) => void;
};

export const useStore = create<State>()(
  immer((set) => ({
    searchTerm: '',
    chaos: false,
    flakiness: 0,
    debounceDelay: 1000,
    delay: 0,
    setSearchTerm: (searchTerm) => set({ searchTerm }),
    setChaos: (chaos) => set({ chaos }),
    setFlakiness: (flakiness) => set({ flakiness }),
    setDebounceDelay: (debounceDelay) => set({ debounceDelay }),
    setDelay: (delay) => set({ delay }),
  })),
);
