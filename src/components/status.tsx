import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { TASK_STATUS } from '@/constants';
import { TaskStatus } from '@/types';

import { Badge } from './ui/badge';

const statusVariants = cva<{ type: Record<TaskStatus, string> }>('', {
  variants: {
    type: {
      not_started: 'bg-red-200 hover:bg-red-300 text-red-700',
      in_progress: 'bg-blue-200 hover:bg-blue-300 text-blue-700',
      completed: 'bg-green-200 hover:bg-green-300 text-green-700',
    },
  },
  defaultVariants: {
    type: 'not_started',
  },
});

export interface StatusProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusVariants> {}

const Status = ({ className, type, ...props }: StatusProps) => {
  const status = TASK_STATUS[type!];

  return (
    <Badge className={cn(statusVariants({ type }), className)} {...props}>
      {status}
    </Badge>
  );
};
Status.displayName = 'Status';

export { Status };
