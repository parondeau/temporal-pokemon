import clsx from 'clsx';

import { DefaultErrorComponent } from '../../../components/DefaultErrorComponent';
import { DefaultLoadingComponent } from '../../../components/DefaultLoadingComponent';
import { usePokemon } from '../../../hooks/queries/usePokemon';

export const PokemonCard = ({ id }: { id: string }) => {
  const { data, status, error, fetchStatus } = usePokemon({ id });

  if (status === 'pending') {
    return <DefaultLoadingComponent fetchStatus={fetchStatus} />;
  }

  if (status === 'error') {
    return <DefaultErrorComponent error={error} />;
  }

  return (
    <div className="container mx-auto">
      <div className="rounded-lg border border-zinc-200 p-6 shadow-sm">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold capitalize">{data.name}</h1>
            <div className="text-sm text-zinc-500">
              {data.japanese_name} • {data.classfication}
            </div>
          </div>
          <span className="rounded-full bg-zinc-600 px-3 py-1 text-sm">
            #{data.pokedex_number}
          </span>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left column */}
          <div className="space-y-6">
            {/* Types */}
            <div>
              <h2 className="mb-2 text-lg font-semibold">Types</h2>
              <div className="flex gap-2">
                <span className="rounded-full bg-zinc-600 px-3 py-1 text-sm capitalize">
                  {data.type1}
                </span>
                {data.type2 && (
                  <span className="rounded-full bg-zinc-600 px-3 py-1 text-sm capitalize">
                    {data.type2}
                  </span>
                )}
              </div>
            </div>

            {/* Base Stats */}
            <div>
              <h2 className="mb-2 text-lg font-semibold">Base Stats</h2>
              <div className="space-y-2">
                {[
                  { name: 'HP', value: data.hp },
                  { name: 'Attack', value: data.attack },
                  { name: 'Defense', value: data.defense },
                  { name: 'Sp. Attack', value: data.sp_attack },
                  { name: 'Sp. Defense', value: data.sp_defense },
                  { name: 'Speed', value: data.speed },
                ].map((stat) => (
                  <div key={stat.name} className="flex items-center gap-2">
                    <span className="w-24 text-sm">{stat.name}:</span>
                    <div className="h-2 w-full rounded-full bg-zinc-600">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${(stat.value / 255) * 100}%` }}
                      />
                    </div>
                    <span className="w-12 text-sm">{stat.value}</span>
                  </div>
                ))}
                <div className="mt-2 text-sm text-zinc-500">
                  Base Total: {data.base_total}
                </div>
              </div>
            </div>

            {/* Physical Traits */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-semibold">Height</h2>
                <p>{data.height_m}m</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Weight</h2>
                <p>{data.weight_kg}kg</p>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Abilities */}
            <div>
              <h2 className="mb-2 text-lg font-semibold">Abilities</h2>
              <div className="flex flex-wrap gap-2">
                {data.abilities.map((ability) => (
                  <span
                    key={ability}
                    className="rounded-full bg-zinc-600 px-3 py-1 text-sm"
                  >
                    {ability}
                  </span>
                ))}
              </div>
            </div>

            {/* Type Effectiveness */}
            <div>
              <h2 className="mb-2 text-lg font-semibold">Type Effectiveness</h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {Object.entries(data)
                  .filter(([key]) => key.startsWith('against_'))
                  .map(([key, value]) => {
                    const effectivenessValue = Number(value);
                    return (
                      <div
                        key={key}
                        className={clsx(
                          'flex items-center justify-between rounded px-3 py-1',
                          {
                            'bg-red-400': effectivenessValue < 1,
                            'bg-green-500': effectivenessValue > 1,
                            'bg-zinc-600': effectivenessValue === 1,
                          },
                        )}
                      >
                        <span className="text-sm capitalize">
                          {key.replace('against_', '')}:
                        </span>
                        <span className="text-sm font-medium">×{value}</span>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Additional Info</h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>Generation: {data.generation}</div>
                <div>Catch Rate: {data.capture_rate}</div>
                <div>Base Happiness: {data.base_happiness}</div>
                <div>Base Egg Steps: {data.base_egg_steps}</div>
                <div>Experience Growth: {data.experience_growth}</div>
                <div>
                  Male Ratio: {data.percentage_male}
                  {typeof data.percentage_male === 'number' ? '%' : ''}
                </div>
                <div>Legendary: {data.is_legendary === 1 ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
