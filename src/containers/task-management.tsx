import { HeaderActions } from './header-actions';
import { TableView } from './table-view';
import { TaskForm } from './task-form';

export function TaskManagementContainer() {
  return (
    <>
      <HeaderActions />
      <TableView />
      <TaskForm />
    </>
  );
}
