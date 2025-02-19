import { TableCustomFieldForm } from './table-custom-field-form';
import { TableBodyData } from './table-body-data';
import { TableHeaderData } from './table-header-data';
import { TablePagination } from './table-pagination';

export function TableView() {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-4xl max-w-7xl border-collapse mx-auto">
          <thead>
            <TableHeaderData />
          </thead>
          <tbody>
            <TableBodyData />
          </tbody>
        </table>
      </div>

      <TablePagination />

      <TableCustomFieldForm />
    </div>
  );
}
