import { TASK_PRIORITY, TASK_STATUS } from '@/constants';
import { Filter, TableColumn, Task, TaskPriority, TaskStatus } from '@/types';

export function getFilter(filters: Filter[], filter: keyof Task): Filter | undefined {
  return filters.find(f => f.key === filter);
}

export function getTableColumn(tableColumns: TableColumn[], filter: keyof Task): TableColumn {
  return tableColumns.find(column => column.id === filter) as TableColumn;
}

export function getLabel(tableColumns: TableColumn[], filter: keyof Task): string {
  const tableColumn = getTableColumn(tableColumns, filter);

  if (
    tableColumn?.type === 'status' ||
    tableColumn?.type === 'priority' ||
    tableColumn?.type === 'boolean' ||
    tableColumn?.type === 'text' ||
    tableColumn?.type === 'number'
  ) {
    return `${tableColumn?.name} is:`;
  }

  return `${tableColumn?.name} contains:`;
}

export function getSelectedFilter(
  tableColumns: TableColumn[],
  filters: Filter[],
  filter: keyof Task,
): string | undefined {
  const tableColumn = getTableColumn(tableColumns, filter);
  const filterValue = getFilter(filters, filter)?.value;

  if (tableColumn?.type === 'status') {
    return TASK_STATUS[filterValue as TaskStatus];
  }

  if (tableColumn?.type === 'priority') {
    return TASK_PRIORITY[filterValue as TaskPriority];
  }

  if (tableColumn?.type === 'boolean') {
    return filterValue ? 'Checked' : 'Unchecked';
  }

  return filterValue as string;
}
