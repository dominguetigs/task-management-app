import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface FilterActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

export function FilterActionButton({ icon: Icon, label, onClick }: FilterActionButtonProps) {
  return (
    <Button
      variant="link"
      className="h-auto w-auto rounded-none border-0 p-0 m-0 shadow-none text-slate-500 cursor-pointer"
      onClick={onClick}
    >
      <Icon />
      {label}
    </Button>
  );
}
