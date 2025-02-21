'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/icon';
import { Input } from '@/components/ui/input';

import { useTable } from '@/store';

export default function Search() {
  const { search, setSearch, clearSelection } = useTable();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 relative">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => {
            clearSelection();
            setSearch(e.target.value);
          }}
          className={`transition-all duration-300 ease-in-out pr-8 ${
            isOpen ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'
          } overflow-hidden`}
        />

        {search && (
          <button
            type="button"
            onClick={() => setSearch('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <Icon name="x" size={16} />
          </button>
        )}
      </div>

      <Button variant="ghost" size="icon" onClick={() => setIsOpen(prev => !prev)}>
        <Icon name="search" />
      </Button>
    </div>
  );
}
