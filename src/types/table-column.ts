import { CustomField, CustomFieldTypes } from './custom-field';

export type TableFixedColumnType = 'priority' | 'status';

export type TableColumnType = CustomFieldTypes | TableFixedColumnType;

export type TableColumn = Omit<CustomField, 'type'> & {
  type: TableColumnType;
};
