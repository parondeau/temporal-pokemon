import { useCallback } from 'react';
import { useShallow } from 'zustand/shallow';

import {
  Field,
  FieldGroup,
  Label,
} from '../../../components/catalyst/fieldset';
import { Input } from '../../../components/catalyst/input';
import { Switch, SwitchField } from '../../../components/catalyst/switch';
import { type State, useStore } from '../../../useStore';

const selector = (state: State) => ({
  chaos: state.chaos,
  setChaos: state.setChaos,
  flakiness: state.flakiness,
  setFlakiness: state.setFlakiness,
  debounceDelay: state.debounceDelay,
  setDebounceDelay: state.setDebounceDelay,
  delay: state.delay,
  setDelay: state.setDelay,
});

const MIN_FLAKINESS = 0;
const MAX_FLAKINESS = 100;
const MIN_DELAY = 0;
const MAX_DELAY = 20000;
const MIN_DEBOUNCE = 0;
const MAX_DEBOUNCE = 10000;

export const SettingsPanel = () => {
  const {
    chaos,
    setChaos,
    flakiness,
    setFlakiness,
    debounceDelay,
    setDebounceDelay,
    delay,
    setDelay,
  } = useStore(useShallow(selector));

  const handleFlakinessChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsedValue = Number(e.target.value);
      if (!isNaN(parsedValue)) {
        setFlakiness(
          Math.max(Math.min(parsedValue, MAX_FLAKINESS), MIN_FLAKINESS),
        );
      }
    },
    [setFlakiness],
  );

  const handleDebounceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsedValue = Number(e.target.value);
      if (!isNaN(parsedValue)) {
        setDebounceDelay(
          Math.max(Math.min(parsedValue, MAX_DEBOUNCE), MIN_DEBOUNCE),
        );
      }
    },
    [setDebounceDelay],
  );

  const handleDelayChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsedValue = Number(e.target.value);
      if (!isNaN(parsedValue)) {
        setDelay(Math.max(Math.min(parsedValue, MAX_DEBOUNCE), MIN_DEBOUNCE));
      }
    },
    [setDelay],
  );

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="text-xl font-bold">Settings</div>
      <FieldGroup>
        <SwitchField className="gap-x-1">
          <Label>Chaos Mode</Label>
          <Switch checked={chaos} onChange={setChaos} />
        </SwitchField>
        <Field>
          <Label>Flakiness (%)</Label>
          <Input
            name="flakiness"
            value={flakiness}
            type="number"
            max={MAX_FLAKINESS}
            min={MIN_FLAKINESS}
            onChange={handleFlakinessChange}
          />
        </Field>
        <Field>
          <Label>API Delay (ms)</Label>
          <Input
            name="delay"
            value={delay}
            type="number"
            max={MAX_DELAY}
            min={MIN_DELAY}
            onChange={handleDelayChange}
          />
        </Field>
        <Field>
          <Label>Debounce Delay (ms)</Label>
          <Input
            name="debounceDelay"
            value={debounceDelay}
            type="number"
            max={MAX_DEBOUNCE}
            min={MIN_DEBOUNCE}
            onChange={handleDebounceChange}
          />
        </Field>
      </FieldGroup>
    </div>
  );
};
