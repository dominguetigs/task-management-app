import { DEFAULT_TABLE_COLUMNS } from '@/constants';
import { TableColumn } from '@/types';
import { getFromLocalstorage, setToLocalstorage } from '@/utils';

export function retrieveTableColumns(): TableColumn[] {
  const storedTableColumns = getFromLocalstorage<TableColumn[]>('table-columns');

  if (!storedTableColumns) {
    setToLocalstorage('table-columns', DEFAULT_TABLE_COLUMNS);
    return DEFAULT_TABLE_COLUMNS;
  }

  return storedTableColumns;
}
