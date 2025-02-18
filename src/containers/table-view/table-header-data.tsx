'use client';

import { ArrowDown, ArrowUp, Plus } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import { Icon } from '@/components/icon';

import { useTableCustomColumnFormPanel, useTable } from '@/store';
import { CustomField, Task } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RemoveCustomFieldAction } from '@/components/remove-custom-field-action';

export function TableHeaderData() {
  const onOpenChange = useTableCustomColumnFormPanel(state => state.onOpenChange);
  const { columns: tableColumns, rows: tableRows, sort, setSort } = useTable();

  function handleSort(columnId: keyof Task) {
    if (sort?.key === columnId) {
      setSort({ key: columnId, order: sort.order === 'asc' ? 'desc' : 'asc' });
    } else {
      setSort({ key: columnId, order: 'asc' });
    }
  }

  return (
    <tr>
      <th scope="col" className="p-1 text-center">
        {tableRows.length > 0 && <Checkbox />}
      </th>

      {tableColumns.map(column => (
        <th
          key={column.id}
          scope="col"
          className="px-2 py-1 text-left text-sm hover:bg-slate-100 transition"
        >
          <div className="flex items-center gap-1">
            <Icon name={column.icon} size={16} />

            <span>{column.name}</span>
            <button
              type="button"
              onClick={() => handleSort(column.id)}
              className="text-slate-400 hover:text-slate-700 transition cursor-pointer"
            >
              {sort && sort.key === column.id ? (
                sort.order === 'asc' ? (
                  <ArrowUp className="w-4 h-4 text-slate-700" />
                ) : (
                  <ArrowDown className="w-4 h-4 text-slate-700" />
                )
              ) : (
                <ArrowUp className="w-4 h-4 opacity-50 group-hover:opacity-100" />
              )}
            </button>

            {column.canInteract && (
              <DropdownMenu>
                <DropdownMenuTrigger className="ml-auto" asChild>
                  <div>
                    <Icon name="ellipsis-vertical" size={16} />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-auto" align="start">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => onOpenChange(true, column as CustomField)}>
                      <div className="flex items-center gap-2">
                        <Icon name="pencil" size={16} />
                        <span>Edit</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={event => event.preventDefault()}>
                      <RemoveCustomFieldAction customField={column as CustomField} />
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </th>
      ))}

      <th
        scope="col"
        className="px-2 py-1 text-left text-sm text-slate-400 hover:text-slate-700 cursor-pointer"
      >
        <button
          type="button"
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => onOpenChange(true)}
        >
          <Plus className="w-4 h-4" />
          Add column
        </button>
      </th>
    </tr>
  );
}
