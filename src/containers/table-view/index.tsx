import { TableBodyData } from './table-body-data';
import { TableHeaderData } from './table-header-data';
import { TablePagination } from './table-pagination';

export function TableView() {
  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <TableHeaderData />
          </thead>

          <tbody>
            <TableBodyData />
          </tbody>
        </table>
      </div>
      <TablePagination />
    </>
  );
}
