import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { useShallow } from 'zustand/shallow';

import { NotFoundError } from '../../errors/PokemonErrors';
import { type State, useStore } from '../../useStore';
import { buildApiUrl } from '../../utils/buildApiUrl';

const pokemonResponse = z.object({
  abilities: z.array(z.string()),
  against_bug: z.number(),
  against_dark: z.number(),
  against_dragon: z.number(),
  against_electric: z.number(),
  against_fairy: z.number(),
  against_fight: z.number(),
  against_fire: z.number(),
  against_flying: z.number(),
  against_ghost: z.number(),
  against_grass: z.number(),
  against_ground: z.number(),
  against_ice: z.number(),
  against_normal: z.number(),
  against_poison: z.number(),
  against_psychic: z.number(),
  against_rock: z.number(),
  against_steel: z.number(),
  against_water: z.number(),
  attack: z.number(),
  base_egg_steps: z.number(),
  base_happiness: z.number(),
  base_total: z.number(),
  capture_rate: z.number(),
  classfication: z.string(),
  defense: z.number(),
  experience_growth: z.number(),
  height_m: z.number(),
  hp: z.number(),
  japanese_name: z.string(),
  name: z.string(),
  percentage_male: z.union([z.string(), z.number()]),
  pokedex_number: z.number(),
  sp_attack: z.number(),
  sp_defense: z.number(),
  speed: z.number(),
  type1: z.string(),
  type2: z.string().nullable(),
  weight_kg: z.number(),
  generation: z.number(),
  is_legendary: z.number(),
  id: z.number(),
});

const selector = (state: State) => ({
  chaos: state.chaos,
  flakiness: state.flakiness,
  delay: state.delay,
});

export const usePokemon = ({ id }: { id: string | undefined }) => {
  const { chaos, flakiness, delay } = useStore(useShallow(selector));

  return useQuery({
    queryKey: ['usePokemon', { id, chaos, flakiness, delay }],
    queryFn: async () => {
      if (!id) {
        throw new Error('No ID provided');
      }
      const url = buildApiUrl(`${id}`, {
        chaos,
        flakiness,
        delay,
      });
      const res = await fetch(url);
      const json = await res.json();
      const parsedResponse = pokemonResponse.safeParse(json);
      if (parsedResponse.error) {
        if (json.error === 'Pokémon not found') {
          throw new NotFoundError();
        }
        throw new Error(json.error || 'An error occurred');
      }
      return parsedResponse.data;
    },
    enabled: id !== '',
  });
};
