import { PokemonSearchResultsCards } from './PokemonSearchResultsCards';
import { DefaultErrorComponent } from '../../../components/DefaultErrorComponent';
import { DefaultLoadingComponent } from '../../../components/DefaultLoadingComponent';
import type { usePokemonSearch } from '../../../hooks/queries/usePokemonSearch';

type PokemonSearchResultsProps = ReturnType<typeof usePokemonSearch>;

export const PokemonSearchResults = ({
  fetchStatus,
  data,
  status,
  error,
}: PokemonSearchResultsProps) => {
  if (status === 'pending') {
    return <DefaultLoadingComponent fetchStatus={fetchStatus} />;
  } else if (status === 'error') {
    return <DefaultErrorComponent error={error} />;
  }
  return <PokemonSearchResultsCards data={data} />;
};
