import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { CUSTOM_BOOLEAN_FIELD } from '@/constants';

interface BooleanFilterProps {
  value: boolean;
  updateFilter: (value: string) => void;
}

export function BooleanFilter({ value, updateFilter }: BooleanFilterProps) {
  return (
    <RadioGroup value={String(value)} onValueChange={updateFilter}>
      {Object.entries(CUSTOM_BOOLEAN_FIELD).map(([key, value]) => (
        <div key={key} className="flex items-center gap-2">
          <RadioGroupItem value={key} id={key} />
          <label htmlFor={key}>{value}</label>
        </div>
      ))}
    </RadioGroup>
  );
}
