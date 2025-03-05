import { useShallow } from 'zustand/shallow';

import { PokemonSearchResults } from './PokemonSearchResults/PokemonSearchResults';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Field } from '../../components/catalyst/fieldset';
import { Input } from '../../components/catalyst/input';
import { usePokemonSearch } from '../../hooks/queries/usePokemonSearch';
import { useDebounce } from '../../hooks/useDebounce';
import { type State, useStore } from '../../useStore';

const selector = (state: State) => ({
  searchTerm: state.searchTerm,
  setSearchTerm: state.setSearchTerm,
  delay: state.debounceDelay,
});

export const Search = () => {
  const { searchTerm, setSearchTerm, delay } = useStore(useShallow(selector));
  const debouncedSearchTerm = useDebounce(searchTerm, { delay });
  const searchQuery = usePokemonSearch({
    searchTerm: debouncedSearchTerm,
  });

  return (
    <div className="flex flex-col items-start justify-start gap-4">
      <Field className="w-full">
        <Input
          aria-label="Search for a Pokemon"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a Pokemon..."
        />
      </Field>
      <PokemonSearchResults {...searchQuery} />
      {searchQuery.isFetching && (
        <div className="absolute right-2 bottom-2">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};
