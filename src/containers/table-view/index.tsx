import { TableCustomFieldForm } from './table-custom-field-form';
import { TableBodyData } from './table-body-data';
import { TableHeaderData } from './table-header-data';
import { TablePagination } from './table-pagination';

export function TableView() {
  return (
    <>
      <div className="w-full max-w-[100%] overflow-x-auto">
        <table className="w-full min-w-[100%] border-collapse">
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
    </>
  );
}
