import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Status } from '@/components/status';

import { TASK_STATUS } from '@/constants';
import { TaskStatus } from '@/types';

interface StatusFilterProps {
  value: string;
  updateFilter: (value: string) => void;
}

export function StatusFilter({ value, updateFilter }: StatusFilterProps) {
  return (
    <RadioGroup value={value} onValueChange={updateFilter}>
      {Object.keys(TASK_STATUS)?.map(key => (
        <div key={key} className="flex items-center gap-2">
          <RadioGroupItem value={key} id={key} />
          <label htmlFor={key}>
            <Status type={key as TaskStatus} />
          </label>
        </div>
      ))}
    </RadioGroup>
  );
}
