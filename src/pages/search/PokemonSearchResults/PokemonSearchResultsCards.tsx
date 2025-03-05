import { generatePath } from 'react-router';

import { Link } from '../../../components/catalyst/link';
import type { usePokemonSearch } from '../../../hooks/queries/usePokemonSearch';
import { routes } from '../../../routes';

type TableData = NonNullable<ReturnType<typeof usePokemonSearch>['data']>;

export const PokemonSearchResultsCards = ({ data }: { data: TableData }) => {
  return (
    <div className="mx-auto grid w-full grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-4">
      {data.pages.flatMap((page) =>
        page.pokemon.map((pokemon) => (
          <Link
            className="flex gap-3 rounded-lg border border-zinc-200 bg-zinc-800 p-4 transition-all hover:bg-zinc-900 hover:shadow-md"
            key={pokemon.id}
            to={generatePath(routes.pokemon, { id: String(pokemon.id) })}
          >
            <div className="font-medium text-zinc-500">{pokemon.id}</div>
            <div className="font-medium">{pokemon.name}</div>
          </Link>
        )),
      )}
    </div>
  );
};
