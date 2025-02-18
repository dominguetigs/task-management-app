import { TableColumn } from '@/types';

export const DEFAULT_TABLE_COLUMNS: TableColumn[] = [
  {
    id: 'id',
    name: 'ID',
    type: 'number',
    icon: 'hash',
    canInteract: false,
  },
  {
    id: 'title',
    name: 'Task',
    type: 'text',
    icon: 'text',
    canInteract: false,
  },
  {
    id: 'status',
    name: 'Status',
    type: 'status',
    icon: 'hourglass',
    canInteract: false,
  },
  {
    id: 'priority',
    name: 'Priority',
    type: 'priority',
    icon: 'pin',
    canInteract: false,
  },
];
