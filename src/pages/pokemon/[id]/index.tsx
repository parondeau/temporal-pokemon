import { useNavigate, useParams } from 'react-router';

import { PokemonCard } from './PokemonCard';
import { Button } from '../../../components/catalyst/button';
import { routes } from '../../../routes';

export const Pokemon = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    navigate(routes.home);
    return null;
  }

  return (
    <>
      <Button href="/">Home</Button>
      <div className="container mx-auto p-6">
        <PokemonCard id={id} />
      </div>
    </>
  );
};
