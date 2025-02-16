import { TableBodyData } from './table-body-data';
import { TableHeaderData } from './table-header-data';

export function TableView() {
  return (
    <div className="w-full max-w-3xl mx-auto overflow-x-auto">
      <table className="w-full min-w-[800px] border-collapse">
        <thead>
          <TableHeaderData />
        </thead>

        <tbody>
          <TableBodyData />
        </tbody>
      </table>
    </div>
  );
}
