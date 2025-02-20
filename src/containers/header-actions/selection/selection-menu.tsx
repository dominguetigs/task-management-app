'use client';

import { Fragment } from 'react';

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
import { useTable, useTasks } from '@/store';
import { TaskPriority, TaskStatus } from '@/types';

interface SelectionMenuProps {
  selectedRowsIds: number[];
}

export function SelectionMenu({ selectedRowsIds }: SelectionMenuProps) {
  const { columns, clearSelection } = useTable();
  const updateMultipleTasks = useTasks(state => state.updateMultipleTasks);

  const menuBarOptions = columns.filter(
    column => column.id === 'status' || column.id === 'priority',
  );

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
                        onClick={() => {
                          updateMultipleTasks(selectedRowsIds, option.id, key);
                          clearSelection();
                        }}
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
