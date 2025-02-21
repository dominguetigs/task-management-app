'use client';

import { Fragment } from 'react';

import { toast } from 'sonner';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Separator } from '@/components/ui/separator';

import { Icon } from '@/components/icon';
import { Priority } from '@/components/priority';
import { Status } from '@/components/status';

import { TASK_PRIORITY, TASK_STATUS } from '@/constants';
import { useTable, useTasks } from '@/stores';
import { TaskPriority, TaskStatus } from '@/types';
import { toastUndo } from '@/utils';

interface SelectionMenuProps {
  selectedRowsIds: number[];
}

export function SelectionMenu({ selectedRowsIds }: SelectionMenuProps) {
  const { columns, clearSelection } = useTable();
  const { updateMultipleTasks, undo } = useTasks();

  const menuBarOptions = columns.filter(
    column => column.id === 'status' || column.id === 'priority',
  );

  function handleUpdateMultipleTasks(
    selectedRowsIds: number[],
    optionId: string,
    key: string,
  ): void {
    updateMultipleTasks(selectedRowsIds, optionId, key);
    clearSelection();

    toastUndo(`${selectedRowsIds.length > 1 ? 'Tasks' : 'Task'} updated successfully`, null, () => {
      undo();
      toast(`${selectedRowsIds.length > 1 ? 'Tasks' : 'Task'} update undone`);
    });
  }

  return (
    <Menubar>
      {menuBarOptions.map((option, index) => {
        const menuBarItemOptions = option.id === 'status' ? TASK_STATUS : TASK_PRIORITY;
        const isLast = index === menuBarOptions.length - 1;

        return (
          <Fragment key={option.id}>
            <MenubarMenu>
              <MenubarTrigger>
                <div className="flex items-center space-x-1">
                  <Icon name={option.icon} size={16} />
                  <span>{option.name}</span>
                </div>
              </MenubarTrigger>
              <MenubarContent>
                <>
                  {Object.keys(menuBarItemOptions).map(key => (
                    <Fragment key={key}>
                      <MenubarItem
                        onClick={() => handleUpdateMultipleTasks(selectedRowsIds, option.id, key)}
                      >
                        {option.id === 'status' && <Status type={key as TaskStatus} />}
                        {option.id === 'priority' && <Priority type={key as TaskPriority} />}
                      </MenubarItem>
                    </Fragment>
                  ))}
                </>
              </MenubarContent>
            </MenubarMenu>

            {!isLast && <Separator orientation="vertical" />}
          </Fragment>
        );
      })}
    </Menubar>
  );
}
