'use client';

import { ArrowUp, Plus } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import { Icon } from '@/components/icon';

import { useTableCustomColumnFormPanel, useTable } from '@/stores';
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
import { paginateTasks } from '@/utils';

export function TableHeaderData() {
  const onOpenChange = useTableCustomColumnFormPanel(state => state.onOpenChange);
  const {
    columns: tableColumns,
    rows: tableRows,
    sort,
    setSort,
    pagination,
    selectedRows,
    toggleSelectAll,
  } = useTable();

  function handleSort(columnId: keyof Task) {
    if (sort?.key === columnId) {
      setSort({ key: columnId, order: sort.order === 'asc' ? 'desc' : 'asc' });
    } else {
      setSort({ key: columnId, order: 'asc' });
    }
  }

  const taskIds = paginateTasks(tableRows, pagination).map(task => task.id);
  const selectedCount = Array.from(selectedRows).filter(id => taskIds.includes(id)).length ?? 0;
  const isAllSelected = selectedCount === taskIds.length;
  const isIndeterminate = selectedCount > 0 && selectedCount < taskIds.length;

  return (
    <tr>
      <th scope="col" className="p-1 text-center sticky -left-[1px] bg-white z-10 shadow-sm">
        {tableRows.length > 0 && (
          <Checkbox
            checked={isIndeterminate ? 'indeterminate' : isAllSelected}
            onCheckedChange={() => toggleSelectAll(taskIds, isIndeterminate)}
          />
        )}
      </th>

      {tableColumns.map(column => (
        <th
          key={column.id}
          scope="col"
          className="px-2 py-1 text-left text-sm hover:bg-slate-100 transition"
        >
          <div className="flex items-center gap-1">
            <Icon name={column.icon} size={16} />

            <span
              className="truncate max-w-40 overflow-hidden whitespace-nowrap"
              title={column.name}
            >
              {column.name}
            </span>

            <button
              type="button"
              onClick={() => handleSort(column.id)}
              className="text-slate-400 hover:text-slate-700 transition cursor-pointer"
            >
              <ArrowUp
                className={`w-4 h-4 text-slate-700 transition-transform duration-200 ${
                  sort && sort.key === column.id
                    ? sort.order === 'desc'
                      ? 'rotate-180'
                      : ''
                    : 'opacity-50 group-hover:opacity-100'
                }`}
              />
            </button>

            {column.canInteract && (
              <DropdownMenu>
                <DropdownMenuTrigger className="ml-auto pl-6" asChild>
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
          className="flex items-center gap-1 w-30 cursor-pointer"
          onClick={() => onOpenChange(true)}
        >
          <Plus className="w-4 h-4" />
          Add column
        </button>
      </th>
    </tr>
  );
}
