import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { z } from 'zod';
import { useShallow } from 'zustand/shallow';

import { NotFoundError } from '../../errors/PokemonErrors';
import { type State, useStore } from '../../useStore';
import { buildApiUrl } from '../../utils/buildApiUrl';

const pokemon = z.object({ id: z.number(), name: z.string() });
const pokemonSearchResponse = z.object({
  nextPage: z.string().optional(),
  pokemon: z.array(pokemon),
});

const selector = (state: State) => ({
  chaos: state.chaos,
  flakiness: state.flakiness,
  delay: state.delay,
});

export const usePokemonSearch = ({ searchTerm }: { searchTerm: string }) => {
  const { chaos, flakiness, delay } = useStore(useShallow(selector));

  const searchQuery = useInfiniteQuery({
    queryKey: ['useSearch', { searchTerm, chaos, flakiness, delay }],
    queryFn: async ({ pageParam }) => {
      const url = buildApiUrl(`search/${searchTerm}`, {
        pageParam,
        chaos,
        flakiness,
        delay,
      });
      const res = await fetch(url);
      const json = await res.json();
      const parsedResponse = pokemonSearchResponse.safeParse(json);
      if (parsedResponse.error) {
        if (json.error === 'Page out of bounds') {
          throw new NotFoundError();
        }
        throw new Error(json.error || 'An error occurred');
      }
      return parsedResponse.data;
    },
    enabled: searchTerm !== '',
    getNextPageParam: (lastPage) => lastPage?.nextPage,
    initialPageParam: undefined as string | undefined, // casting for type inference
  });

  const { hasNextPage, fetchNextPage, data } = searchQuery;

  // continue to load more data, as long as there is more data to load
  useEffect(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, data]);

  return searchQuery;
};
