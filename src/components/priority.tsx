import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { TaskPriority } from '@/types';

import { Badge } from './ui/badge';

const priorityVariants = cva<{ type: Record<TaskPriority, string> }>('capitalize', {
  variants: {
    type: {
      none: 'bg-slate-200 hover:bg-slate-300 text-slate-700',
      low: 'bg-green-200 hover:bg-green-300 text-green-700',
      medium: 'bg-yellow-200 hover:bg-yellow-300 text-yellow-700',
      high: 'bg-orange-200 hover:bg-orange-300 text-orange-700',
      urgent: 'bg-red-200 hover:bg-red-300 text-red-700',
    },
  },
  defaultVariants: {
    type: 'low',
  },
});

export interface PriorityProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof priorityVariants> {}

const Priority = ({ className, type, ...props }: PriorityProps) => {
  return (
    <Badge className={cn(priorityVariants({ type }), className)} {...props}>
      {type}
    </Badge>
  );
};
Priority.displayName = 'Priority';

export { Priority };
