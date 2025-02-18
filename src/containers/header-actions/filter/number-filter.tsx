import { Input } from '@/components/ui/input';

interface NumberFilterProps {
  value: number;
  updateFilter: (value: number) => void;
}

export function NumberFilter({ value, updateFilter }: NumberFilterProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const numericValue = e.target.value.replace(/\D/g, '');
    updateFilter(numericValue ? Number(numericValue) : 0);
  }

  return (
    <Input
      type="number"
      className="w-full px-2 py-1 border rounded"
      placeholder="Type a value..."
      value={value}
      onChange={handleChange}
    />
  );
}
