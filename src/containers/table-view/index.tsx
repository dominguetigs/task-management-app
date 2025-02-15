import { TableBodyData } from './table-body-data';
import { TableHeaderData } from './table-header-data';

export function TableView() {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <TableHeaderData />
        </tr>
      </thead>

      <tbody>
        <TableBodyData />
      </tbody>
    </table>
  );
}
