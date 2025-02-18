import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Priority } from '@/components/priority';

import { TASK_PRIORITY } from '@/constants';
import { TaskPriority } from '@/types';

interface PriorityFilterProps {
  value: string;
  updateFilter: (value: string) => void;
}

export function PriorityFilter({ value, updateFilter }: PriorityFilterProps) {
  return (
    <RadioGroup value={value} onValueChange={updateFilter}>
      {Object.keys(TASK_PRIORITY)?.map(key => (
        <div key={key} className="flex items-center gap-2">
          <RadioGroupItem value={key} id={key} />
          <label htmlFor={key}>
            <Priority type={key as TaskPriority} />
          </label>
        </div>
      ))}
    </RadioGroup>
  );
}
