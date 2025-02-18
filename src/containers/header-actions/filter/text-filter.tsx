import { Input } from '@/components/ui/input';

interface TextFilterProps {
  value: string;
  updateFilter: (value: string) => void;
}

export function TextFilter({ value = '', updateFilter }: TextFilterProps) {
  return (
    <Input
      type="string"
      className="w-full px-2 py-1 border rounded"
      placeholder="Type a value..."
      value={value}
      onChange={e => updateFilter(e.target.value)}
    />
  );
}
