import { create } from "zustand";

export const useStore = create((set) => ({
	pokemons: [],
	setPokemons: (pokemons: { name: string; url: string; id: number }) =>
		set({ pokemons }),
}));
