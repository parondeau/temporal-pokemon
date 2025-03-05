import { NotFoundError } from '../errors/PokemonErrors';

export const DefaultErrorComponent = ({ error }: { error: Error }) => {
  if (error instanceof NotFoundError) {
    return <div>No results found</div>;
  }
  return <div>Error: {error.message}</div>;
};
